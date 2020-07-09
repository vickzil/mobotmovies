// SHOW NAVIGATION MENU
export const showNavMenu = (state) => {
    return state.showNavMenu;
};


// PAGE LOADING STATUS
export const pageLoading = (state) => {
    return state.pageloading;
};

// PAGE LOADING STATUS
export const getCurrentdate = () => {
    var d = new Date();
    var month = new Array();
    var date = d.getDate();
    var year = d.getFullYear();

    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    var m = month[d.getMonth()];

    let currentD = date + "-" + m + "-" + year;

    return currentD;
};


export const projectById = (state) => {
    return (projectid) => {
        return state.projects.find((project) => project.id == projectid);
    };
};


export const messageById = (state) => {
    return (messageid) => {
        return state.messages.find((message) => message.id == messageid);
    };
};