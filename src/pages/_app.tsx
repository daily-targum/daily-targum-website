import Router from "next/router";
import NextApp from 'next/app';
// @ts-ignore
import withGA from "next-ga";
export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_CODE, Router)(NextApp);