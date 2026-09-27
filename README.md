# Capivora Robotics — website

Next.js 16 (App Router) + Tailwind 4. One page, no CMS.

```bash
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where inquiry form data goes

The form posts to `src/app/api/inquiry/route.ts`, which validates the data and **emails it to you via [Resend](https://resend.com)**.

1. Create a free Resend account, then **API Keys → Create API key**.
2. Put these in `.env.local` (locally) and in your host's environment variables (production):
   - `RESEND_API_KEY` – the key from step 1
   - `INQUIRY_TO_EMAIL` – who receives inquiries (comma-separate for several)
3. Restart the server. Submit the form; the email arrives with the visitor's address as *Reply-To*.

Notes
- Until you verify a domain in Resend, mail is sent from `onboarding@resend.dev` and **only delivers to the email you signed up to Resend with**. To send to any address, verify your domain in Resend and set `INQUIRY_FROM_EMAIL="Capivora Website <inquiries@yourdomain.com>"`.
- If the two variables are missing: in development submissions are saved to `.data/inquiries.jsonl` (so you can test); in production the form shows an error instead of a false "Thanks", so no lead is silently lost.
- Quick test once configured:
  ```bash
  curl -X POST localhost:3000/api/inquiry -H 'content-type: application/json' \
    -d '{"name":"Test","email":"you@example.com","message":"hello"}'
  ```

## Content and imagery

- Copy: `src/content/site.ts` and the section components in `src/components/`. The `applications` list there also sets the topic chips in the inquiry form (sent as the `building` field).
- Imagery is placeholder inline SVG in `src/components/art/`. Replace a component's body with `<Image src="/images/…" alt="…" />` when real photography is ready.
- Theme: light by default, dark via the nav toggle (tokens in `src/app/globals.css`). Type is Archivo; headlines use its width axis (`.display`, `.h-section`). Safety yellow (`--color-signal`) is for fills and markers only, never text on a light background.
