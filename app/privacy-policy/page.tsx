import { PageHero } from '@/components/section'

export const metadata = {
  title: 'Privacy Policy | Saferx Medical Supplies',
  description: 'Privacy Policy of Saferx Medical Supplies Private Limited.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Privacy Policy"
        description="How we collect, use, and protect your data."
        breadcrumb="Privacy Policy"
        backgroundImage="/images/medicalheader.png"
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl container-px prose prose-slate md:prose-lg dark:prose-invert">
          <p><strong>Company:</strong> Saferx Medical Supplies Private Limited</p>

          <h2>Introduction</h2>
          <p>
            Saferx Medical Supplies Private Limited ("Saferx", "we", "our", or "us") is committed to protecting the privacy of individuals who visit our website or interact with us through our services. This Privacy Policy explains what personal data we collect, why we collect it, and how we handle it. By using our website or submitting an enquiry, you agree to the practices described in this policy.
          </p>

          <h2>1. Information We Collect</h2>
          <p><strong>Information you provide directly:</strong></p>
          <ul>
            <li>Name, designation, and hospital / institution name</li>
            <li>Email address and phone number</li>
            <li>Location / city / state</li>
            <li>Enquiry details and product or service requirements</li>
            <li>Any documents or attachments you send us</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul>
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on each page</li>
            <li>Referring website or search query</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to respond to product enquiries and quotation requests, process purchase orders and arrange delivery or installation, provide AMC and after-sales support, send relevant product updates or knowledge-centre content (with your consent), improve our website through analytics, and comply with legal and regulatory obligations under Indian law. We do not use your data for automated decision-making or profiling.
          </p>

          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell, rent, or trade your personal data. We may share it only with logistics partners or installation engineers involved in fulfilling your order, with authorities when required by Indian law, or in the event of a business merger (with prior notice to you). All third parties are bound by confidentiality obligations.
          </p>

          <h2>4. Cookies & Tracking</h2>
          <p>
            Our website uses essential cookies for functionality and analytics cookies (such as Google Analytics) to understand how visitors use the site. You can disable cookies in your browser settings, though some features may not work correctly. We do not use cookies to display third-party advertisements.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We use SSL encryption and restricted internal access to protect your data. No method of internet transmission is 100% secure, but we take all reasonable steps to protect your information.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain personal data for as long as necessary to fulfil the purpose for which it was collected. Enquiry and order records are typically retained for seven (7) years in accordance with Indian tax regulations.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023 (DPDPA) and other applicable laws, you have the right to access, correct, or request erasure of your personal data, withdraw consent for marketing at any time, and raise a complaint with the Data Protection Board of India. To exercise any right, email us at sales@saferxmedical.com.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may link to manufacturer or external websites. We are not responsible for their privacy practices and encourage you to review their policies separately.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are intended for healthcare professionals and institutions. We do not knowingly collect data from individuals under 18. Such data will be deleted promptly if discovered.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this policy at any time. Material changes will be published on this page with a revised effective date. Continued use of our website constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            <strong>Saferx Medical Supplies Pvt. Ltd.</strong><br />
            D.No. 9/24, Irugur Main Road, Irugur, Coimbatore – 641103, Tamil Nadu, India<br />
            Email: sales@saferxmedical.com | Phone:+91 7845555955
          </p>
        </div>
      </section>
    </div>
  )
}
