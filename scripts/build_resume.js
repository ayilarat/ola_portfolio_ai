const {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  LevelFormat,
  Packer,
  PageNumber,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
} = require("docx");
const fs = require("fs");
const path = require("path");

const outputPath = path.resolve(__dirname, "..", "Ola_Ayilara_Resume_Generic.docx");
const navy = "17223B";
const teal = "0D6B61";
const charcoal = "25313D";
const muted = "596775";
const rule = "C7D5D2";

const link = (label, url) =>
  new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text: label,
        color: teal,
        underline: { type: UnderlineType.SINGLE, color: teal },
        size: 19,
      }),
    ],
  });

const sectionTitle = (text) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: 170, after: 70 },
    border: {
      bottom: { color: rule, style: BorderStyle.SINGLE, size: 6, space: 5 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        color: navy,
        size: 21,
        characterSpacing: 35,
      }),
    ],
  });

const roleHeading = (role, company, dates, location, pageBreakBefore = false) => [
  new Paragraph({
    keepNext: true,
    pageBreakBefore,
    spacing: { before: 95, after: 12 },
    children: [
      new TextRun({ text: role, bold: true, color: navy, size: 21 }),
      new TextRun({ text: `  |  ${company}`, bold: true, color: teal, size: 21 }),
    ],
  }),
  new Paragraph({
    keepNext: true,
    spacing: { after: 28 },
    children: [
      new TextRun({ text: dates, bold: true, color: charcoal, size: 18 }),
      new TextRun({ text: `  |  ${location}`, color: muted, size: 18 }),
    ],
  }),
];

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: "resume-bullets", level: 0 },
    spacing: { after: 45, line: 240 },
    children: [new TextRun({ text, color: charcoal, size: 19 })],
  });

const body = (text) =>
  new Paragraph({
    spacing: { after: 70, line: 250 },
    children: [new TextRun({ text, color: charcoal, size: 19 })],
  });

const doc = new Document({
  creator: "Ola Ayilara",
  title: "Ola Ayilara Senior Product Designer Resume",
  description: "Generic senior product designer resume",
  styles: {
    default: {
      document: { run: { font: "Arial", size: 19, color: charcoal } },
    },
  },
  numbering: {
    config: [
      {
        reference: "resume-bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 300, hanging: 150 } },
              run: { color: teal, font: "Arial", size: 18 },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 620, right: 700, bottom: 620, left: 700 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Ola Ayilara  |  Senior Product Designer  |  Page ", color: muted, size: 16 }),
                new TextRun({ children: [PageNumber.CURRENT], color: muted, size: 16 }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 35 },
          children: [new TextRun({ text: "OLA AYILARA, PMP", bold: true, color: navy, size: 34 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 65 },
          children: [
            new TextRun({
              text: "Senior Product Designer  |  B2B SaaS  |  AI Native Product Design  |  Growth Experiences",
              bold: true,
              color: teal,
              size: 21,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [
            link("hello@tunde.me", "mailto:hello@tunde.me"),
            new TextRun({ text: "  |  +1 416 277 8886  |  Toronto, Ontario  |  ", color: muted, size: 19 }),
            link("tunde.me", "https://www.tunde.me"),
            new TextRun({ text: "  |  ", color: muted, size: 19 }),
            link("LinkedIn", "https://www.linkedin.com/in/olaayilara"),
          ],
        }),

        sectionTitle("Professional Summary"),
        body(
          "Senior Product Designer with 8+ years of experience designing onboarding, activation, and expansion experiences across B2B SaaS, artificial intelligence, fintech, public services, and ecommerce. Combines qualitative research, product analytics, systems thinking, and high craft interaction design to turn complex workflows into clear, trusted experiences. Known for rapid AI assisted prototyping, scalable Figma systems, close product and engineering collaboration, and measurable improvements to adoption, completion, and growth."
        ),

        sectionTitle("Core Expertise"),
        body(
          "Product Strategy  |  End to End Product Design  |  AI Native Workflows  |  Onboarding and Activation  |  Interaction Design  |  Design Systems  |  Rapid Prototyping  |  User Research  |  Funnel Analysis  |  Accessibility  |  Content Design  |  Cross Functional Leadership"
        ),

        sectionTitle("Professional Experience"),
        ...roleHeading("Senior UX Specialist and Content Designer", "Ontario Public Service", "Feb 2024 to Present", "Toronto, Ontario"),
        bullet("Led experience and content design for high traffic government digital services serving more than 15 million users, reducing journey drop off by 30 percent through research informed improvements."),
        bullet("Combined qualitative research, accessibility evaluation, and funnel analysis to simplify complex citizen journeys and make high stakes information easier to understand and act on."),
        bullet("Partnered with product, engineering, policy, and content teams to prototype, validate, and deliver inclusive web and mobile experiences at public service scale."),

        ...roleHeading("Senior Product Designer", "Arteria AI", "Nov 2022 to Feb 2024", "Toronto, Ontario"),
        bullet("Designed AI powered contract management workflows for enterprise clients including RBC, Scotiabank, and JP Morgan, increasing feature adoption by 40 percent."),
        bullet("Created explainable agentic interactions, intelligent drafting, and in context guidance that gave users clear control over complex document workflows."),
        bullet("Scaled reusable Figma components and documented interaction patterns, improving consistency and collaboration across product and engineering teams."),

        ...roleHeading("Product Design Lead", "Black Professionals in Technology", "Jul 2022 to Nov 2022", "Toronto, Ontario", true),
        bullet("Redesigned onboarding and activation for a B2B SaaS platform, increasing user activation by 30 percent through clearer setup, guidance, and progress feedback."),
        bullet("Led discovery, rapid prototyping, and evaluative research while aligning product, engineering, and stakeholder decisions around measurable user outcomes."),

        ...roleHeading("Senior Product Designer", "Carbon Digital Bank", "Jan 2020 to Jun 2022", "Lagos, Nigeria"),
        bullet("Redesigned identity verification and onboarding journeys, reducing KYC abandonment by 18 percent and supporting more than 100,000 user acquisitions."),
        bullet("Designed mobile and web banking experiences that helped grow the product from 10,000 to 100,000 users within 18 months."),
        bullet("Built a scalable Figma design system and accessible interaction standards for consistent delivery across web and mobile platforms."),

        ...roleHeading("Chief Design Officer and Founder", "Rich Sweets Limited", "Oct 2014 to Dec 2019", "Lagos, Nigeria"),
        bullet("Led zero to one product design and business development for an ecommerce platform used by more than 500 small businesses."),
        bullet("Designed merchant and customer experiences that increased online sales by 30 percent while establishing repeatable product and service operations."),

        sectionTitle("Tools and Methods"),
        body(
          "Figma, FigJam, Miro, Adobe Creative Suite, ProtoPie, Principle, Google Analytics, Mixpanel, Amplitude, FullStory, Hotjar, v0.dev, Galileo AI, Figma AI, LLM Prompting, Generative Research, Evaluative Research, Journey Mapping, Usability Testing, Design Critique"
        ),

        sectionTitle("Education and Credentials"),
        body("Project Management Professional, PMP, 2024  |  BSc Management and Accounting, Obafemi Awolowo University  |  Web Design for Usability, Interaction Design Foundation"),

        sectionTitle("Community"),
        body("Design Mentor, ADPList.org  |  Supporting designers through portfolio critique, career guidance, and product design mentorship."),
      ],
    },
  ],
});

Packer.toBuffer(doc)
  .then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    process.stdout.write(`${outputPath}\n`);
  })
  .catch((error) => {
    process.stderr.write(`${error.stack || error}\n`);
    process.exit(1);
  });
