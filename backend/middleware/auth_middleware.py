"""
JWT cookie-based authentication middleware.
Protects all /admin/* routes except /admin/login.
"""
from fastapi import Request
from fastapi.responses import RedirectResponse
from starlette.middleware.base import BaseHTTPMiddleware
from utils.jwt import verify_access_token


class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware that checks for a valid JWT in the 'access_token' cookie."""

    EXCLUDED_PATHS = {
        "/admin/login",
        "/docs",
        "/openapi.json",
        "/redoc",
    }

    async def dispatch(self, request: Request, call_next):
        path = request.url.path

        # Allow static files, non-admin routes, and excluded paths
        if (
            not path.startswith("/admin")
            or path in self.EXCLUDED_PATHS
            or path.startswith("/static")
        ):
            return await call_next(request)

        # Check JWT cookie
        token = request.cookies.get("access_token")
        if not token:
            return RedirectResponse(url="/admin/login", status_code=302)

        payload = verify_access_token(token)
        if payload is None:
            response = RedirectResponse(url="/admin/login", status_code=302)
            response.delete_cookie("access_token")
            return response

        # Attach admin info to request state for downstream use
        request.state.admin_email = payload.get("sub", "")
        request.state.admin_id = payload.get("admin_id", None)

        return await call_next(request)
