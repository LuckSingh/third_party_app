export function sessionSave(nameSpace, data) {
    //存取操作
    if (!!data || data === 0) {
        sessionStorage.setItem(nameSpace, JSON.stringify(data));
    }
    return (nameSpace && JSON.parse(sessionStorage.getItem(nameSpace))) || null;
}