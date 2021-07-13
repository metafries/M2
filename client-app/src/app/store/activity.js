import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";


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
        activity.date = new Date(activity.date);
    }

    getActivity = id => {
        return this.activityRegistry.get(id);
    }

    setLoading = state => {
        this.loading = state;
    }
    
    createActivity = async activity => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })
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
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
            })
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