import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuidv4 } from 'uuid';
import agent from "../api/agent";


export default class Activity {
    loading = false;
    activityRegistry = new Map();
    expandIds = {};
    selectedActivity = undefined;
    anchorEl = null;
    showActivityInputs = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date))
    }

    loadActivities = async () => {
        this.setLoading(true);
        try {
            const data = await agent.Activities.list();
            data.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
                this.expandIds[activity.id] = false;
            });
            this.setLoading(false);
        } catch(error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = state => {
        this.loading = state;
    }
    setShowActivityInputs = state => {
        this.showActivityInputs = state;
    }

    createActivity = async activity => {
        this.submitting = true;
        activity.id = uuidv4();
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
        this.selectedActivity = this.activityRegistry.get(id);
    }
    handleMenuClick = e => {
        this.anchorEl = e.currentTarget;
    }
    handleMenuClose = () => {
        this.anchorEl = null;
        this.handleSelectActivity('');
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