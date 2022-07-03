export const adminMenu = [
  //quản lý người dùng
  {
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/crud-redux",
      },
      {
        name: "menu.admin.manager-doctor",
        link: "/system/doctor",
      },
      // {
      //   name: "menu.admin.manager-admin",
      //   link: "/system/admin",
      // },

      {
        name: "menu.doctor.schedule",
        link: "/doctor/schedule",
      },
    ],
  },
  //quản lý phòng khám
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/clinic",
      },
    ],
  },
  //quản lý chuyên khoa
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/specialty",
      },
    ],
  },
  //quản lý cẩm nang
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/handbook",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.doctor.schedule",
        link: "/doctor/schedule",
      },
    ],
  },
];
