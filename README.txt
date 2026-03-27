SNP Logistics single-folder site

What changed:
- All pages are standalone HTML files with inline CSS and inline JS only.
- Shared reliable header/footer across every page.
- Logo updated to the live SVG URL you provided.
- About page rewritten to sound credible and niche-specific.
- Dummy testimonials added as placeholders.
- Dummy MC placeholder and current USDOT placeholder included in footer/contact areas.
- Quote page now posts to /api/quote.

Cloudflare deployment:
1) Deploy these HTML files to Cloudflare Pages.
2) Add a Pages Function or Worker route at /api/quote.
3) Store your email API key as a Cloudflare secret.
4) Use an email provider like Resend to forward form submissions to your inbox.

Minimal Pages Function example (functions/api/quote.js):

export async function onRequestPost(context) {
  const data = await context.request.json();
  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${data.name || ''}</p>
    <p><strong>Email:</strong> ${data.email || ''}</p>
    <p><strong>Company:</strong> ${data.company || ''}</p>
    <p><strong>Phone:</strong> ${data.phone || ''}</p>
    <p><strong>Origin:</strong> ${data.origin || ''}</p>
    <p><strong>Destination:</strong> ${data.destination || ''}</p>
    <p><strong>Equipment:</strong> ${data.equipment || ''}</p>
    <p><strong>Ship Date:</strong> ${data.ship_date || ''}</p>
    <p><strong>Details:</strong> ${data.details || ''}</p>
  `;

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'SNP Logistics <onboarding@resend.dev>',
      to: ['quotes@snplogistics.org'],
      subject: 'New Quote Request',
      html
    })
  });

  if (!resendResponse.ok) {
    return new Response('Email send failed', { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

Then set a Cloudflare environment variable named RESEND_API_KEY.
Replace the sender and recipient with your real production addresses.
