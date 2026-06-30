import { PageHero } from '@/components/section'

export const metadata = {
  title: 'Terms & Conditions | Saferx Medical Supplies',
  description: 'Terms and Conditions of Saferx Medical Supplies Private Limited.',
}

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Terms & Conditions"
        description="Please read these terms carefully before using our services."
        breadcrumb="Terms & Conditions"
        backgroundImage="/images/medicalheader.png"
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl container-px prose prose-slate md:prose-lg dark:prose-invert">

          <p><strong>Company:</strong> Saferx Medical Supplies Private Limited</p>
          <p><strong>Governing Law:</strong> Laws of India</p>

          <h2>Introduction</h2>
          <p>
            These Terms & Conditions govern your use of the Saferx Medical Supplies Private Limited website and your purchase of products and services from us. By placing an order or using our website, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing our website or submitting a purchase order, quotation request, or service agreement, you confirm that you are authorised to enter into a binding agreement on behalf of your organisation and accept these Terms in full.
          </p>

          <h2>2. Our Products & Services</h2>
          <p>
            Saferx supplies certified medical equipment, diagnostic systems, hospital infrastructure solutions, and biomedical services to healthcare institutions across India, acting as an authorised distributor for leading global manufacturers. Our services include supply of equipment, site planning, installation and commissioning, staff training, Annual Maintenance Contracts (AMC), and spare parts and calibration. Specifications, availability, and pricing are subject to change. We reserve the right to decline any order at our discretion.
          </p>

          <h2>3. Orders & Quotations</h2>
          <p>
            All quotations are valid for 30 days from the date of issue unless stated otherwise. A quotation does not constitute a binding contract until a formal purchase order is accepted by Saferx in writing. Orders are confirmed upon receipt of a signed Purchase Order on the buyer's letterhead and the advance payment as specified. Custom or imported equipment may have specific lead times communicated at the time of ordering.
          </p>

          <h2>4. Pricing & Payment</h2>
          <p>
            All prices are in Indian Rupees (INR), exclusive of GST, freight, and installation unless explicitly stated. Standard payment terms are 50% advance with order and 50% before dispatch. Turnkey or project orders follow a milestone-based payment schedule as agreed. AMC services are billed annually in advance. Overdue payments attract interest at 18% per annum. Payment by NEFT/RTGS/IMPS or cheque in favour of Saferx Medical Supplies Private Limited.
          </p>

          <h2>5. Delivery & Installation</h2>
          <p>
            Delivery timelines are estimates and may vary. Risk passes to the buyer upon delivery to the specified site. The buyer is responsible for ensuring site readiness as per our pre-installation checklist. Delays caused by the buyer's failure to prepare the site will not extend warranty start dates. All equipment must be inspected at delivery; shortages or visible damage must be reported within 48 hours.
          </p>

          <h2>6. Warranty & AMC</h2>
          <p>
            Equipment carries the manufacturer's standard warranty, typically 12 months from date of installation. Warranty covers defects in materials and workmanship under normal use. It does not cover damage from misuse or unauthorised modifications, consumables and accessories, or damage from power fluctuations or improper site conditions. AMC contracts cover preventive maintenance, corrective repairs, and software updates as specified in the agreement.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All website content — including text, images, logos, product descriptions, and documentation — is the property of Saferx Medical Supplies Pvt. Ltd. or its licensors. You may not reproduce or use any content for commercial purposes without prior written consent.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Saferx's total liability shall not exceed the invoice value of the relevant product or service. We are not liable for indirect or consequential losses including loss of clinical data, revenue, or operational downtime. We are not responsible for delays caused by force majeure events. Nothing in these Terms limits liability for death or personal injury caused by our negligence.
          </p>

          <h2>9. Website Use</h2>
          <p>
            You must not attempt unauthorised access to our systems, use the site to transmit harmful or misleading content, scrape product data without permission, or use automated tools to submit enquiries. We reserve the right to block access to users who violate these terms.
          </p>

          <h2>10. Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts of Coimbatore, Tamil Nadu. Both parties agree to attempt resolution through 30 days of good-faith negotiation before initiating formal proceedings.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may revise these Terms at any time. The updated version will be published on this page with a revised effective date. Changes do not affect terms already agreed in writing for ongoing contracts.
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
