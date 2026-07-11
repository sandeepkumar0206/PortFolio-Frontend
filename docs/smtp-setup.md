# SMTP Setup (enable later)

Contact messages are **always saved** to the database. SMTP only sends you an email notification when someone submits the form.

Mail is **disabled by default** in local dev. In production (`prod` profile), it defaults to enabled — set credentials or explicitly disable.

---

## When to enable

- After backend and frontend are deployed and contact form works
- When you want inbox notifications for new messages

You do **not** need SMTP for the portfolio to work.

---

## Environment variables

Set these on your **backend host** (Railway, Render, etc.). Never commit passwords to git.

| Variable | Required | Example |
|----------|----------|---------|
| `PORTFOLIO_MAIL_ENABLED` | Yes | `true` |
| `PORTFOLIO_MAIL_TO` | Yes | `you@gmail.com` |
| `SMTP_HOST` | Yes | `smtp.gmail.com` |
| `SMTP_PORT` | Yes | `587` |
| `SMTP_USERNAME` | Yes | `you@gmail.com` |
| `SMTP_PASSWORD` | Yes | Gmail app password (16 chars) |

### Disable mail in production

```text
PORTFOLIO_MAIL_ENABLED=false
```

Messages still persist to PostgreSQL.

---

## Gmail (recommended for personal portfolio)

1. Turn on **2-Step Verification** for your Google account
2. Go to Google Account → Security → **App passwords**
3. Create an app password for "Mail" / "Other (Portfolio)"
4. Use that 16-character password as `SMTP_PASSWORD` (not your normal Gmail password)

```text
PORTFOLIO_MAIL_ENABLED=true
PORTFOLIO_MAIL_TO=you@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=you@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
```

Restart the backend after changing env vars.

---

## Local testing (Windows PowerShell)

```powershell
cd portfolio-backend
$env:PORTFOLIO_MAIL_ENABLED="true"
$env:PORTFOLIO_MAIL_TO="you@gmail.com"
$env:SMTP_USERNAME="you@gmail.com"
$env:SMTP_PASSWORD="your-app-password"
.\mvnw.cmd spring-boot:run
```

Submit the contact form at http://localhost:4200. Check:

- Backend log: `Contact notification emailed for id=...` or `mail disabled` if env not set
- Your inbox (and spam folder)

---

## How it works in code

- Config: `portfolio-backend/src/main/resources/application.properties`
- Service: `ContactService.java` — saves message first, then sends mail if enabled
- If mail fails after save, the API still returns `201` (message is not lost)

---

## Other SMTP providers

| Provider | `SMTP_HOST` | `SMTP_PORT` |
|----------|-------------|-------------|
| Gmail | `smtp.gmail.com` | `587` |
| Outlook | `smtp-mail.outlook.com` | `587` |
| SendGrid | `smtp.sendgrid.net` | `587` |
| Mailgun | `smtp.mailgun.org` | `587` |

Use the provider's SMTP credentials and app-specific passwords where required.

---

## Security checklist

- [ ] Never put SMTP passwords in `application.properties`, git, or frontend code
- [ ] Use app passwords, not account login passwords
- [ ] Rotate app password if leaked
- [ ] `PORTFOLIO_MAIL_TO` can differ from `SMTP_USERNAME` (send from A, notify B)

---

## Verify after enabling

1. Submit test message on live contact form
2. Confirm row in `contact_messages` table
3. Confirm email received with correct name, reply-to, and message body
4. Reply-to is set to the visitor's email (`ContactService` uses `setReplyTo`)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Authentication failed | Use app password; check username matches SMTP account |
| Connection timeout | Confirm port `587` and STARTTLS (enabled in config) |
| Mail not sent, 201 OK | Check `PORTFOLIO_MAIL_ENABLED=true` and backend logs |
| Works locally, not prod | Set same vars on host env panel; redeploy/restart |

For full deploy steps, see [deployment.md](./deployment.md).
