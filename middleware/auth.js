export default function({store,redirect}) {
    const token = store.state.users.token;
    if(!token) {
        redirect('/login');
    }
}