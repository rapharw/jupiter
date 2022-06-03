export default (data: string) => {
    if(data.includes('Please run "az login"'))
        throw new Error("User not logged in")
}
