import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({headers: await headers()});
if(!session){
      return NextResponse.redirect(new URL('/login', request.url))

}
}

 
export const config = {
  matcher: ["/products/:path","/add-product/:path", "/my-products", "/my-orders", "/wishlist", "/profile-settings","/dashboard"],
}


// Private Pages
// Dashboard
// Add Product
// My Products
// My Orders
// Wishlist
// Profile Settings
