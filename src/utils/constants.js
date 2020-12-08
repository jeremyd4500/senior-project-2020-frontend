import KeyMirror from 'keymirror';

export const PATHS = {
	// jsx paths
	root: '/',

	home: '/home',
	account: '/home/account',
	appointments: '/home/appointments',
	inbox: '/home/inbox',
	reports: '/home/reports',
	blogs: '/home/blogs',

	// auth

	login: '/login',
	register: '/register'
};

export const SEX = { Male: 0, Female: 1 };

export const STATES = {
	Alabama: 'AL',
	Alaska: 'AK',
	Arizona: 'AZ',
	Arkansas: 'AR',
	California: 'CA',
	Colorado: 'CO',
	Connecticut: 'CT',
	Delaware: 'DE',
	Florida: 'FL',
	Georgia: 'GA',
	Hawaii: 'HI',
	Idaho: 'ID',
	Illinois: 'IL',
	Indiana: 'IN',
	Iowa: 'IA',
	Kansas: 'KS',
	Kentucky: 'KY',
	Louisiana: 'LA',
	Maine: 'ME',
	Maryland: 'MD',
	Massachusetts: 'MA',
	Michigan: 'MI',
	Minnesota: 'MN',
	Mississippi: 'MS',
	Missouri: 'MO',
	Montana: 'MT',
	Nebraska: 'NE',
	Nevada: 'NV',
	'New Hampshire': 'NH',
	'New Jersey': 'NJ',
	'New Mexico': 'NM',
	'New York': 'NY',
	'North Carolina': 'NC',
	'North Dakota': 'ND',
	Ohio: 'OH',
	Oklahoma: 'OK',
	Oregon: 'OR',
	Pennsylvania: 'PA',
	'Rhode Island': 'RI',
	'South Carolina': 'SC',
	'South Dakota': 'SD',
	Tennessee: 'TN',
	Texas: 'TX',
	Utah: 'UT',
	Vermont: 'VT',
	Virginia: 'VA',
	Washington: 'WA',
	'West Virginia': 'WV',
	Wisconsin: 'WI',
	Wyoming: 'WY'
};

export const ROLES = {
	0: 'Admin',
	1: 'Doctor',
	2: 'Patient'
};

export const APPOINTMENT_STATUS = {
	0: 'Pending Approval',
	1: 'Approved',
	2: 'No Show',
	3: 'Completed'
};

export const APPOINTMENT_STATUS_COLORS = {
	0: 'yellow',
	1: 'lightblue',
	2: 'lightcoral',
	3: 'lightgreen'
};

export const BLOG_STATUS = {
	0: 'Draft',
	1: 'Publish'
};

export const HEADER_TABS = [
	{
		label: 'Home',
		path: PATHS.home
	},
	{
		label: 'Inbox',
		path: PATHS.inbox
	},
	{
		label: 'Appointments',
		path: PATHS.appointments
	},
	{
		label: 'Blogs',
		path: PATHS.blogs
	},
	{
		label: 'Reports & Vitals',
		path: PATHS.reports
	},
	// {
	// 	label: 'Videos',
	// 	path: PATHS.videos
	// },
	{
		label: 'Account',
		path: PATHS.account
	}
];

export const STATUS = KeyMirror({
	ERROR: null,
	INFO: null,
	PENDING: null,
	SUCCESS: null,
	UNKNOWN: null,
	WARNING: null
});

export const MONTHS = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'Jul',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec'
};
