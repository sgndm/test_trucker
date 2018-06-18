import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    // { path: '', title: 'Dashboard', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [] },
    // { path: '/pages/settings', title: 'Settings', icon: 'mdi mdi-settings', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
    // { path: '/pages/permissions', title: 'Permissions', icon: 'mdi mdi-account-key', class: '', label: '', labelClass: '', extralink: false, submenu: [] },


    { path: '', title: 'Loader Dashboard', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [] },
    {
        path: '', title: 'Trucking History', icon: 'mdi mdi-history', class: 'has-arrow', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            { path: '/pages/history/th-week', title: 'This Week', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/history/th-year', title: 'This Year', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/history/th-complete', title: 'Complete  History', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },

    {
        path: '', title: 'Dump Site History', icon: 'mdi mdi-history', class: 'has-arrow', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            { path: '/pages/history/dsh-week', title: 'This Week', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/history/dsh-year', title: 'This Year', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/history/dsh-complete', title: 'Complete  History', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },

    { path: '', title: 'Dump Site Dashboard', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [] },

    {
        path: '', title: 'Projects', icon: 'mdi mdi-view-dashboard', class: 'has-arrow', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            { path: '/pages/projects/today', title: 'Today', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/projects/upcoming', title: 'Upcoming', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/projects/past', title: 'History', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },

    {
        path: '', title: 'Customer Accounts', icon: 'mdi mdi-view-dashboard', class: 'has-arrow', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            { path: '/pages/customers/current', title: 'Current', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/customers/new', title: 'Create New Account', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    },

    { path: '/pages/material', title: 'material Costs', icon: 'mdi mdi-currency-usd', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

    {
        path: '', title: 'Settings And Permissions', icon: 'mdi mdi-view-dashboard', class: 'has-arrow', label: '', labelClass: 'label label-rouded label-themecolor pull-right', extralink: false,
        submenu: [
            { path: '/pages/settings', title: 'Liability Waivers', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/pages/permissions', title: 'Employee Permissions', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    },

    { path: '', title: 'Admin Dashboard', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: [] },
   
    { path: '/pages/admin/dump-companies', title: 'Dump Companies', icon: 'mdi mdi-account-key', class: '', label: '', labelClass: '', extralink: false, submenu: [] },

];
