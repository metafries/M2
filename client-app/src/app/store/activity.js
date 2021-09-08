import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { stores } from "./config";


export default class Activity {
    openActivitySearch = false;
    openActivityClout = false;
    loading = false;
    activityRegistry = new Map();
    expandIds = {};
    selectedActivity = undefined;
    anchorEl = null;
    submitting = false;

    constructor() {
        makeAutoObservable(this);
    }

    setOpenActivitySearch = state => {
        this.openActivitySearch = state;
    }

    setOpenActivityClout = state => {
        this.openActivityClout = state;
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            a.date.getTime() - b.date.getTime());
    }

    get groupedActivities() {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {}))
    }

    loadActivities = async () => {
        this.setLoading(true);
        try {
            const data = await agent.Activities.list();
            data.forEach(activity => {
                this.processData(activity); 
                runInAction(() => {
                    this.activityRegistry.set(activity.id, activity);
                    this.expandIds[activity.id] = false;
                })
            });
            this.setLoading(false);
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    loadActivity = async id => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.setLoading(true);
            try {
                activity = await agent.Activities.details(id);
                this.processData(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoading(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoading(false);
            }
        }
    }

    processData = activity => {
        const user = stores.accountStore.user;
        const username = user ? user.username : null;        
        activity.isGoing = activity.attendees.some(a => a.username === username);
        activity.isHost = activity.hostUsername === username;
        activity.host = activity.attendees.find(x => x.username === activity.hostUsername);
        activity.date = new Date(activity.date);
        this.activityRegistry.set(activity.id, activity);
    }

    getActivity = id => {
        return this.activityRegistry.get(id);
    }

    setLoading = state => {
        this.loading = state;
    }
    
    createActivity = async activity => {
        const user = stores.accountStore.user;
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            activity.hostUsername = user.username;
            activity.attendees.push(user);
            this.processData(activity);
        } catch(error) {
            console.log(error);
        } finally {
            runInAction(() => this.submitting = false);
        }
    }

    handleSelectActivity = id => {
        if (this.activityRegistry.size !== 0) {
            this.selectedActivity = this.activityRegistry.get(id);
        }
    }
    handleMenuClick = e => {
        this.anchorEl = e.currentTarget;
    }
    handleMenuClose = () => {
        this.anchorEl = null;
    }

    updateActivity = async activity => {
        const target = activity.id;
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                let updatedActivity = {...this.getActivity(target), ...activity}
                this.activityRegistry.set(target, updatedActivity);                
            })
        } catch(error) {
            console.log(error);
        } finally {
            runInAction(() => this.submitting = false);
        }
    }

    updateAttendance = async () => {
        const user = stores.accountStore.user;
        const activity = this.selectedActivity;        
        this.submitting = true;                
        try {
            await agent.Activities.attend(activity.id);
            runInAction(() => {
                if (activity.isGoing) {
                    activity.attendees = activity.attendees.filter(
                        a => a.username !== user.username
                    );
                    activity.isGoing = false;
                } else {
                    activity.attendees.push(user);
                    activity.isGoing = true;
                }
                this.activityRegistry.set(activity.id, activity);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.submitting = false);
        }
    }

    cancelActivity = async () => {
        const target = this.selectedActivity;
        this.submitting = true;
        try {
            await agent.Activities.attend(target.id);
            runInAction(() => {
                target.isCancelled = !target.isCancelled;
                this.activityRegistry.set(target.id, target);
            })
            this.processData(target);
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.submitting = false);
        }
    }

    deleteActivity = async id => {
        this.submitting = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.submitting = false;
                this.handleMenuClose();
                this.activityRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })
        }
    }

}