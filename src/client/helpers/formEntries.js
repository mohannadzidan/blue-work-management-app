export default function formEntries(event) {
    const data = new FormData(event.target);
    return Object.fromEntries(data.entries());
}