// assets
import { IconKey } from '@tabler/icons';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';

// constant
const icons = {
  IconKey,
  AutoAwesomeMosaicIcon,
  AssignmentIcon,
  GroupIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    },
    {
      id: 'leads',
      title: 'Leads',
      type: 'collapse',
      icon: icons.AutoAwesomeMosaicIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View Leads',
          type: 'item',
          external: true,
          url: '/leads/view',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add Lead',
          type: 'item',
          url: '/leads/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses',
      type: 'collapse',
      icon: icons.AssignmentIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View Course',
          type: 'item',
          external: true,
          url: '/courses/view',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add Course',
          type: 'item',
          url: '/courses/add',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'users',
      title: 'Users',
      type: 'collapse',
      icon: icons.GroupIcon,
      children: [
        {
          id: 'material-icons',
          title: 'View User',
          type: 'item',
          external: true,
          url: '/users/view',
          breadcrumbs: false
        },
        {
          id: 'addLead',
          title: 'Add User',
          type: 'item',
          url: '/users/add',
          breadcrumbs: false
        }
      ]
    }

  ]
};

export default pages;
