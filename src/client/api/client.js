function preProcessTask(task) {
    // convert string dates to js dates
    task.startDate = new Date(task.startDate);
    task.endDate = new Date(task.endDate);
    return task;
}
class ClientAPI {

    constructor() {
        this.user = undefined;
    }

    me() {
        if (this.user) return Promise.resolve(this.user);
        return fetch('/api/users/me')
            .then(res => res.json())
            .then(json => {
                if (json.status) {
                    this.user = json.payload
                    return this.user
                } else {
                    throw json;
                }
            });
    }

    signOut() {
        this.user = undefined;
        return fetch('/api/auth/signOut', {
            method: 'post'
        })
    }

    getTask(taskId) {
        return fetch('/api/tasks/' + taskId)
            .then(res => res.json())
            .then(response => {
                if (response.status) {
                    return Promise.resolve(preProcessTask(response.payload));
                }
                return Promise.reject(response);

            });
    }
    getAllTasks() {
        return fetch('/api/tasks').then(res => res.json()).then(response => {
            if (response.status) {
                response.payload.forEach(preProcessTask);
                return Promise.resolve(response.payload);
            }
            return Promise.reject(response);
        });
    }
    createTask(task) {

        return fetch('/api/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(preProcessTask(response.payload));
            }
            return Promise.reject(response);
        });
    }

    removeTask(taskId) {
        return fetch('/api/tasks/' + taskId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => null);
    }

    updateTask(taskId, updates) {
        return fetch('/api/tasks/' + taskId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(preProcessTask(response.payload));
            }
            return Promise.reject(response);
        });
    }

    verifyUserEmail(verificationToken) {
        return fetch('/api/auth/verifyUserEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: verificationToken })
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(response.payload);
            }
            return Promise.reject(response);
        });
    }

    resetPassword(resetToken, newPassword) {
        return fetch('/api/auth/resetPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: resetToken, newPassword: newPassword })
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(response.payload);
            }
            return Promise.reject(response);
        });
    }

    requestPasswordReset(email) {
        return fetch('/api/auth/requestPasswordReset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(response.payload);
            }
            return Promise.reject(response);
        });
    }

    validatePasswordResetToken(token) {
        return fetch('/api/auth/validatePasswordResetToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        }).then(res => res.json()).then(response => {
            if (response.status) {
                return Promise.resolve(response.payload);
            }
            return Promise.reject(response);
        });
    }

}

const client = new ClientAPI();
export default client;
