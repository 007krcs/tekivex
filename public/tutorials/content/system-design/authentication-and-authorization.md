## Authentication vs Authorization

| Authentication (AuthN) | Authorization (AuthZ) |
| --- | --- |
| "Who are you?" | "What can you do?" |
| Verify identity | Check permissions |
| Username/password, OAuth, MFA | RBAC, ABAC, ACLs |
| Result: identity token (JWT) | Result: allow or deny |
| Happens first | Happens after authentication |

## OAuth 2.0 + OIDC

**OAuth 2.0** is an *authorization* framework — it grants third-party apps limited access to a user's resources. **OIDC** (OpenID Connect) layers *identity* on top: the token also identifies who the user is.

**Flow:**

1. **User clicks "Sign in with Google"** — App redirects to Google with client_id, scope, redirect_uri
2. **User authenticates at Google** — Google shows consent screen; user approves
3. **Redirect with auth code** — Google redirects to your app with a one-time code
4. **Exchange code for tokens** — Server-to-server: code + client_secret → access_token + id_token
5. **Use tokens** — id_token identifies user; access_token used for API calls


## RBAC vs ABAC

| Model | How | Pros | Cons | Examples |
| --- | --- | --- | --- | --- |
| RBAC (Role-Based) | User has Role; Role has Permissions | Simple, easy to reason about | Role explosion at scale | admin, editor, viewer |
| ABAC (Attribute-Based) | Policy checks user, resource, and context attributes | Fine-grained, dynamic | Complex policies, harder to debug | User.dept == Resource.dept AND time < 17:00 |
