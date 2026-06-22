import { PageHero } from '@/components/section'

export const metadata = {
  title: 'Refund Policy | Saferx Medical Supplies',
  description: 'Refund and Return Policy of Saferx Medical Supplies Private Limited.',
}

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Refund Policy"
        description="Our policy on order cancellations, returns, and refunds."
        breadcrumb="Refund Policy"
        backgroundImage="/images/medicalheader.png"
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-4xl container-px prose prose-slate md:prose-lg dark:prose-invert">
          <p><strong>Company:</strong> Saferx Medical Supplies Private Limited</p>

          <h2>Introduction</h2>
          <p>
            Saferx Medical Supplies Pvt. Ltd. supplies specialised medical equipment and services to healthcare institutions. Due to the regulated and often custom-configured nature of medical devices, our refund and return policy differs from standard consumer goods. We are committed to resolving all issues fairly and promptly.
          </p>

          <h2>1. Order Cancellation</h2>
          <p><strong>Cancellation by the buyer:</strong></p>
          <ul>
            <li>Within 48 hours of order confirmation and before equipment is sourced — full advance refund less any bank or transaction charges</li>
            <li>After 48 hours but before dispatch — refund of advance less 20% restocking or procurement charge (or actual costs incurred, whichever is higher)</li>
            <li>After dispatch — cancellation is not accepted; standard return and refund terms apply</li>
          </ul>
          <p>
            For imported or custom-configured equipment, cancellation charges may be higher depending on the manufacturer's policy and will be communicated at the time of the request.
          </p>
          <p><strong>Cancellation by Saferx:</strong></p>
          <p>
            If we cancel due to unavailability, pricing errors, or inability to fulfil the order, a full refund of any advance payment will be issued without deductions.
          </p>

          <h2>2. Returns & Exchange</h2>
          <p>
            Returns are accepted only when the equipment is in its original unused condition with all packaging, accessories, and documentation intact; the return request is raised within 7 days of delivery; and the return is pre-approved in writing by Saferx. Approved returns will be credited as a replacement, exchange, or refund at our discretion. Return freight is the buyer's responsibility unless the return is due to a defect or our error. Equipment that has been installed, powered on, or used clinically cannot be returned unless found defective under warranty.
          </p>

          <h2>3. Defective or Damaged Goods</h2>
          <p>If equipment arrives damaged in transit or defective on delivery:</p>
          <ul>
            <li>Note the damage on the delivery challan at the time of receipt</li>
            <li>Report in writing to sales@saferxmedical.com within 48 hours of delivery, including photographs of the damage and original packaging</li>
          </ul>
          <p>
            We will arrange on-site repair, replacement of the defective unit or component, or a full or partial refund if repair or replacement is not feasible. Claims raised after 48 hours will be handled under the manufacturer's warranty process.
          </p>

          <h2>4. Refund Process</h2>
          <p>Once a refund is approved:</p>
          <ul>
            <li>Submit your request by email with your Purchase Order number and reason for refund.</li>
            <li>Our team will acknowledge within 2 working days and initiate assessment.</li>
            <li>If applicable, our engineer will inspect goods on-site or request return of equipment.</li>
            <li>Approved refunds are processed within 10–15 business days by bank transfer (NEFT/RTGS) to the original payer's account.</li>
          </ul>
          <p>
            Refunds are not issued in cash. GST amounts are refunded only upon completion of credit note formalities.
          </p>

          <h2>5. AMC & Service Refunds</h2>
          <ul>
            <li>Cancellation within 30 days of AMC start date (no service calls raised) — pro-rata refund for the unused period less a 10% administrative fee</li>
            <li>Cancellation after 30 days — no refund; the remaining period may be transferred to a replacement unit at our discretion</li>
            <li>Saferx-initiated cancellation — pro-rata refund with no deductions</li>
          </ul>
          <p>Individual service call-outs already fulfilled are non-refundable.</p>

          <h2>6. Non-Refundable Items</h2>
          <p>The following are not eligible for return or refund under any circumstance:</p>
          <ul>
            <li>Consumables (electrodes, single-use probes, reagents, filters, printing paper, etc.)</li>
            <li>Equipment that has been installed, used clinically, or modified after delivery</li>
            <li>Custom-configured or bespoke equipment ordered to specific institutional requirements</li>
            <li>Equipment damaged due to misuse, improper maintenance, power faults, or unauthorised repairs</li>
            <li>Software licences once activated</li>
            <li>Training fees once the session has been conducted</li>
          </ul>

          <h2>7. How to Raise a Refund Request</h2>
          <p>
            Email us at sales@saferxmedical.com with the subject line <em>Refund Request – [PO Number]</em>, including your name and institution, Purchase Order and invoice number, date of delivery, reason for refund, and photographs if damage-related. Our team will respond within 2 business days.
          </p>

          <h2>Contact</h2>
          <p>
            <strong>Saferx Medical Supplies Pvt. Ltd.</strong><br />
            D.No. 9/24, Irugur Main Road, Irugur, Coimbatore – 641103, Tamil Nadu, India<br />
            Email: sales@saferxmedical.com | Phone: +91 90434 90435
          </p>
        </div>
      </section>
    </div>
  )
}
