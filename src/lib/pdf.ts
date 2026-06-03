/* ─────────────────────────────────────────────────────────────────────
   PDF Generation using jsPDF + jspdf-autotable
   Called from API routes (server-side)
   ───────────────────────────────────────────────────────────────────── */
import type { Quotation } from "@/types/crm";

export async function generateQuotationPDF(quotation: Quotation): Promise<Buffer> {
  const { jsPDF } = await import("jspdf");
  await import("jspdf-autotable");

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const co = {
    name: process.env.PDF_COMPANY_NAME ?? "NextGen Tech Solution",
    email: process.env.PDF_COMPANY_EMAIL ?? "info@nextgentechsolution.org",
    phone: process.env.PDF_COMPANY_PHONE ?? "+91 9876543210",
    address: process.env.PDF_COMPANY_ADDRESS ?? "India",
    website: process.env.PDF_COMPANY_WEBSITE ?? "https://nextgentechsolution.org",
  };

  const W = 210;
  let y = 0;

  /* ── Header gradient bar ── */
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, W, 4, "F");

  /* ── Company info ── */
  y = 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 50);
  doc.text(co.name, 14, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  y += 6;
  doc.text(`${co.email}  |  ${co.phone}  |  ${co.website}`, 14, y);

  /* ── Quotation label ── */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(59, 130, 246);
  doc.text("QUOTATION", W - 14, 18, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  doc.text(`#${quotation.quotationId}`, W - 14, 26, { align: "right" });
  doc.text(`Date: ${new Date(quotation.createdAt).toLocaleDateString("en-IN")}`, W - 14, 32, { align: "right" });
  doc.text(
    `Valid Until: ${new Date(quotation.validUntil).toLocaleDateString("en-IN")}`,
    W - 14, 38, { align: "right" }
  );

  /* ── Divider ── */
  y = 44;
  doc.setDrawColor(220, 220, 235);
  doc.line(14, y, W - 14, y);

  /* ── Bill to ── */
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 100);
  doc.text("BILL TO", 14, y);

  y += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(30, 30, 50);
  doc.text(quotation.leadName, 14, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  y += 5;
  doc.text(quotation.leadEmail, 14, y);
  y += 4;
  doc.text(quotation.leadPhone, 14, y);
  if (quotation.leadCompany) { y += 4; doc.text(quotation.leadCompany, 14, y); }

  /* ── Items table ── */
  y += 14;
  const tableData = quotation.items.map((item, i) => [
    String(i + 1),
    item.description,
    String(item.quantity),
    `₹${item.unitPrice.toLocaleString("en-IN")}`,
    item.discount > 0 ? `${item.discount}%` : "—",
    `₹${item.total.toLocaleString("en-IN")}`,
  ]);

  (doc as unknown as { autoTable: (opts: Record<string, unknown>) => void }).autoTable({
    startY: y,
    head: [["#", "Description", "Qty", "Unit Price", "Discount", "Total"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: { fontSize: 9, textColor: [50, 50, 70] },
    alternateRowStyles: { fillColor: [248, 249, 255] },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      2: { cellWidth: 18, halign: "center" },
      3: { cellWidth: 30, halign: "right" },
      4: { cellWidth: 22, halign: "center" },
      5: { cellWidth: 30, halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;

  /* ── Totals ── */
  const rightX = W - 14;
  let fy = finalY;
  const addRow = (label: string, value: string, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(9);
    doc.setTextColor(bold ? 30 : 80, bold ? 30 : 80, bold ? 50 : 100);
    doc.text(label, rightX - 55, fy, { align: "left" });
    doc.text(value, rightX, fy, { align: "right" });
    fy += 6;
  };

  doc.setDrawColor(220, 220, 235);
  doc.line(rightX - 70, fy - 4, rightX, fy - 4);
  addRow("Subtotal", `₹${quotation.subtotal.toLocaleString("en-IN")}`);
  if (quotation.discountAmount > 0)
    addRow("Discount", `-₹${quotation.discountAmount.toLocaleString("en-IN")}`);
  addRow(`GST (${quotation.taxRate}%)`, `₹${quotation.taxAmount.toLocaleString("en-IN")}`);
  doc.line(rightX - 70, fy - 2, rightX, fy - 2);
  fy += 2;
  addRow("TOTAL", `₹${quotation.total.toLocaleString("en-IN")}`, true);

  /* ── Terms ── */
  if (quotation.terms) {
    fy += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 100);
    doc.text("TERMS & CONDITIONS", 14, fy);
    fy += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 120);
    const lines = doc.splitTextToSize(quotation.terms, W - 28);
    doc.text(lines, 14, fy);
    fy += lines.length * 4;
  }

  /* ── Footer ── */
  const pageH = 297;
  doc.setFillColor(59, 130, 246);
  doc.rect(0, pageH - 4, W, 4, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 170);
  doc.text(
    `${co.name} · ${co.email} · ${co.phone}`,
    W / 2, pageH - 10, { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}
