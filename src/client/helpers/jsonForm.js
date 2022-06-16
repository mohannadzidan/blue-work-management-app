export default function jsonForm(responseHandler) {
    return (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const values = Object.fromEntries(data.entries());
        fetch(event.target.action, {
            method: event.target.method,
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((res) => {
            if(res.status) {
                responseHandler(res);
            }else{
                throw res;
            }
        }).catch(err => {
            responseHandler(undefined, err)
        })
    }
}