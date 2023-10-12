import { NextRequest, NextResponse } from "next/server";

// there is middleware defined which checks the usersession and if user tries to access the url in config it will automatically redirect to login page

/* import middleware from "next-auth/middleware";
export default middleware; */
// above two lines can be summed up in one line
export { default } from 'next-auth/middleware'; // in this way we are exporting the default object which imported from `next-auth/middleware` module



/* // in this middleware redirect to new-page which does not exist
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/new-page', request.url));
} */



// this is end-points when hit middleware will execute.it supports
export const config = {
    // * : zero or more
    // + :  one or more
    // ?  : zero or one
    matcher: ['/users/:id*']
}