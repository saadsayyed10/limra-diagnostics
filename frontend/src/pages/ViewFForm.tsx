import { useState } from "react";

// Define the interface for the component props to handle dynamic data injection
interface FormFProps {
  patientName?: string;
  totalOffsprings?: string;
  livingBoys?: string;
  livingGirls?: string;
  husband?: string;
  localAddress?: string;
  pincode?: string;
  city?: string;
  state?: string;
  doctorName?: string;
  lastMenstrual?: string;
  patientDate?: string;
  procedureDate?: string;
  createdAt?: string;
  patientAge?: string;
  patientPhone?: string;
}

export default function ViewFForm({
  patientName = "____________________",
  totalOffsprings = "_____",
  livingBoys = "____________________",
  livingGirls = "____________________",
  husband = "____________________",
  localAddress = "________________________________________",
  pincode = "______",
  city = "____________",
  state = "___________",
  doctorName = "____________________",
  lastMenstrual = "___________",
  patientDate = "___________",
  procedureDate = "___________",
  createdAt = "___________",
  patientAge = "_____",
  patientPhone = "_________________",
}: FormFProps) {
  // State for handling checkboxes/ticks within the form
  const [selectedIndications, setSelectedIndications] = useState<string[]>([]);
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [selectedInvasiveIndications, setSelectedInvasiveIndications] =
    useState<string[]>([]);
  const [selectedInvasiveProcedures, setSelectedInvasiveProcedures] = useState<
    string[]
  >([]);
  const [selectedAdditionalTests, setSelectedAdditionalTests] = useState<
    string[]
  >([]);

  const toggleIndication = (id: string) => {
    setSelectedIndications((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-300 shadow-lg font-serif text-sm text-gray-900 selection:bg-blue-100">
      {/* HEADER SECTION */}
      <div className="text-center mb-6 space-y-1">
        <h1 className="text-xl font-bold tracking-wider">FORM F</h1>
        <p className="text-xs italic">
          [Refer provision to section 4(3) rules 9(4) and 10(1A)]
        </p>
        <h2 className="text-base font-bold uppercase max-w-2xl mx-auto pt-2 border-t border-gray-400">
          FORM FOR MAINTENANCE OF RECORDS IN CASE OF PRENATAL DIAGNOSTIC
          TEST/PROCEDURE BY GENETIC CLINIC/ULTRASOUND CLINIC/IMAGING CENTRE
        </h2>
      </div>

      {/* SECTION A */}
      <section className="mb-8">
        <h3 className="bg-gray-100 px-2 py-1 font-bold border border-gray-400 mb-4">
          Section A: To be filled in for all Diagnostic Procedure Tests
        </h3>

        <div className="space-y-4">
          <div>
            <span className="font-bold">
              1. Name and complete address of the Genetic Clinic/Ultrasound
              Clinic/Imaging Centre:
            </span>
            <div className="mt-1 pl-4 italic bg-gray-50 p-2 rounded border border-dashed border-gray-300">
              Limra Diagnostics, Natasha Enclave, C1-001, NIBM Post Office Rd,
              Bhatnagar Colony, Kondhwa, Pune, Maharashtra 411048.
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">
              2. Registration no. (Under PC & PNDT Act, 1994):
            </span>
            <span className="border-b border-gray-400 px-2 min-w-[200px] font-mono">
              XYZ123
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">3. Patient's Name:</span>
            <span className="border-b border-gray-400 px-2 min-w-[300px] font-bold">
              {patientName}
            </span>
          </div>

          <div className="space-y-2 border border-gray-200 p-3 rounded">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold">
                4. Total Number of living Children:
              </span>
              <span className="border-b border-gray-400 px-4 font-bold">
                {totalOffsprings}
              </span>
              <span className="text-gray-500 text-xs">(total Offsprings)</span>
            </div>
            <div className="pl-4 space-y-2">
              <div className="flex flex-wrap gap-2 items-center">
                <span>
                  A. Number of living Sons with age of each living son (in years
                  or months):
                </span>
                <span className="border-b border-gray-400 px-2 flex-grow">
                  {livingBoys}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span>
                  B. Number of living Daughter with age of each living daughter
                  (in years or months):
                </span>
                <span className="border-b border-gray-400 px-2 flex-grow">
                  {livingGirls}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">
              5. Husband's/Wife/Father's/Mother's Name:
            </span>
            <span className="border-b border-gray-400 px-2 flex-grow">
              {husband}
            </span>
          </div>

          <div>
            <span className="font-bold">
              6. Full Postal address of the patient with contact Number, if any:
            </span>
            <div className="pl-4 mt-1 border-b border-gray-400 pb-1">
              {localAddress}, {pincode}, {city} - {state}.
            </div>
          </div>

          <div className="space-y-3 border border-gray-200 p-3 rounded bg-gray-50/50">
            <div>
              <span className="font-bold">
                7. a. Referred by (Full name and addresses of doctor (s)/Genetic
                Counseling Centre):
              </span>
              <div className="pl-4 mt-1 text-xs text-gray-700 italic">
                Limra Diagnostics, Natasha Enclave, C1-001, NIBM Post Office Rd,
                Bhatnagar Colony, Kondhwa, Pune, Maharashtra 411048.
              </div>
              <p className="text-xs text-red-600 mt-1 pl-4 font-sans font-medium">
                (Referral Slips to be preserved carefully with form F)
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-bold">
                  b. Self-Referral by Gynecologist/Radiologist/Registered
                  Medical Practitioner Conducting the diagnostic procedure:
                </span>
                <span className="border-b border-gray-400 px-2 font-bold text-blue-800">
                  {doctorName}
                </span>
              </div>
              <p className="text-xs text-red-600 mt-1 font-sans font-medium">
                (Referral note with indications and case papers of the patient
                to be preserved with form F)
              </p>
              <p className="text-xs text-gray-500 italic mt-0.5 pl-2">
                (Self-referral does not mean a client coming to a clinic and
                requesting for the test or the relative/s requesting for the
                test of a pregnant women)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">
              8. Last Menstrual period or weeks of pregnancy:
            </span>
            <span className="border-b border-gray-400 px-4 font-bold">
              {lastMenstrual}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION B */}
      <section className="mb-8">
        <h3 className="bg-gray-100 px-2 py-1 font-bold border border-gray-400 mb-4">
          Section B: To be filled in for performing non-invasive diagnostic
          Procedures/Tests only
        </h3>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">
              9. Name of the doctor performing the procedure/s:
            </span>
            <span className="border-b border-gray-400 px-2 min-w-[250px] font-bold">
              {doctorName}
            </span>
          </div>

          <div>
            <span className="font-bold">
              10. Indication/s for diagnosis procedures (specify with reference
              to the request made in the referral slip or in a self referral
              note):
            </span>
            <p className="text-xs text-gray-600 italic my-2">
              (Ultrasonography prenatal diagnosis during pregnancy should only
              be performed when indicated. The following is the representative
              list of indications for ultrasound during pregnancy. Put a "Tick"
              against the appropriate indication/s for ultrasound).
            </p>

            {/* Checklist of Indications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mt-3 text-xs pl-2">
              {[
                { id: "i", text: "i. Estimation of gestational age (dating)" },
                {
                  id: "ii",
                  text: "ii. Detection of number of foetuses and their chorionicity",
                },
                {
                  id: "iii",
                  text: "iii. Suspected pregnancy with IUCD in-situ or suspected pregnancy following contraceptive failure/MTP failure.",
                },
                { id: "iv", text: "iv. Vaginal bleeding/leaking." },
                { id: "v", text: "v. Follow-up of cases of abortion" },
                {
                  id: "vi",
                  text: "vi. Assessment of cervical canal and diameter of internal os.",
                },
                {
                  id: "vii",
                  text: "vii. Discrepancy between uterine size and period of amenorrhea.",
                },
                {
                  id: "viii",
                  text: "viii. Any suspected adnexal or uterine pathology/abnormality",
                },
                {
                  id: "ix",
                  text: "ix. Detection of chromosomal abnormalities, fetal structural defects and other abnormalities and their follow-up",
                },
                {
                  id: "x",
                  text: "x. To evaluate fetal presentation and position",
                },
                { id: "xi", text: "xi. Assessment of liquor amnii" },
                {
                  id: "xiii",
                  text: "xiii. Preterm labor/preterm premature rupture of membranes",
                },
                {
                  id: "xiv",
                  text: "xiv. Evaluation of placental position, thickness, grading and abnormalities (placenta praevia, retro placenta hemorrhage, abnormal adherence etc.)",
                },
                {
                  id: "xv",
                  text: "xv. Evaluation of umbilical cord - presentation, insertion, nuchal encirclement, number of vessels and presence of true knot",
                },
                {
                  id: "xvi",
                  text: "xvi. Evaluation of previous Caesarean Section scars",
                },
                {
                  id: "xvii",
                  text: "xvii. Evaluation of fetal growth parameters, fetal weight and fetal well being",
                },
                {
                  id: "xviii",
                  text: "xviii. Color flow mapping and duplex Doppler studies",
                },
                {
                  id: "xix",
                  text: "xix. Ultrasound guided procedures such as medical termination of pregnancy, external cephalic version etc. And their follow-up",
                },
                {
                  id: "xx",
                  text: "xx. Adjunct diagnostic and therapeutic invasive interventions such as chorionic villus sampling (CVS) amniocenteses, fetal blood sampling, fetal skin biopsy, amnioinfusion, intrauterine infusion, placement of shunts etc.",
                },
                { id: "xxi", text: "xxi. Observation of intra-partum events" },
                {
                  id: "xxii",
                  text: "xxii. Medical/surgical condition complicating pregnancy",
                },
                {
                  id: "xxiii",
                  text: "xxiii. Research/scientists studies in recognized institutions",
                },
              ].map((ind) => (
                <label
                  key={ind.id}
                  className="flex items-start space-x-2 p-1 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selectedIndications.includes(ind.id)}
                    onChange={() => toggleIndication(ind.id)}
                  />
                  <span>{ind.text}</span>
                </label>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1 italic pl-2">
              1. Substituted vide GSR 109(E), dt. 14-2-2003, w.e.f. 14-2-2003
            </p>
          </div>

          <div className="space-y-2 border border-gray-200 p-3 rounded">
            <span className="font-bold block">
              11. Procedure carried out (Non-Invasive) Put a "Tick" on the
              appropriate procedures:
            </span>
            <label className="flex items-center space-x-2 text-xs pl-2">
              <input
                type="checkbox"
                defaultChecked={true}
                className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="font-semibold">i. Ultrasound</span>
            </label>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-2 text-xs text-yellow-900 mt-1">
              <span className="font-bold">Important Note:</span> Ultrasound is
              not indicated/advised/performed to determine the sex of fetus
              except for diagnosis of sex-linked diseases such as Duchene
              Muscular Dystrophy, Hemophilia A&B etc.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold text-xs">
                12. Date on which declaration of pregnant women/person was
                obtained:
              </span>
              <span className="border-b border-gray-400 px-2 font-mono">
                {patientDate}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold text-xs">
                13. Date on which procedure was carried out:
              </span>
              <span className="border-b border-gray-400 px-2 font-mono">
                {procedureDate}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-xs">
              14. Result of the non-invasive procedure carried out (report in
              brief of the test):
            </span>
            <div className="w-full h-12 border border-gray-300 rounded bg-gray-50/30"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold text-xs">
                15. The result of pre-natal diagnostic procedures was conveyed
                to:
              </span>
              <span className="border-b border-gray-400 flex-grow"></span>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-bold text-xs">
                16. Any indication for MTP as per the abnormality detected:
              </span>
              <span className="border-b border-gray-400 flex-grow"></span>
            </div>
          </div>

          {/* Doctor Sign Box */}
          <div className="pt-4 flex justify-end">
            <div className="text-center text-xs max-w-sm space-y-1 border border-gray-200 p-4 rounded bg-gray-50">
              <div className="h-12 border-b border-dashed border-gray-300 flex items-end justify-center text-gray-400 italic">
                Signature / Seal
              </div>
              <p className="font-bold pt-1">
                Name, Signature and Registration Numbers with seal
              </p>
              <p className="text-[10px] text-gray-500">
                of the Gynaecologist/Radiologist/Registered Medical Practitioner
                performing Diagnostic procedure/s
              </p>
              <div className="text-left pt-2 space-y-1 text-[11px] border-t border-gray-100 mt-2">
                <div>
                  <span className="font-semibold">Date:</span>{" "}
                  ___________________
                </div>
                <div>
                  <span className="font-semibold">Place:</span>{" "}
                  ___________________
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C */}
      <section className="mb-8">
        <h3 className="bg-gray-100 px-2 py-1 font-bold border border-gray-400 mb-4">
          Section C: To be filled for performing invasive Procedure/Test only
        </h3>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold">
              17. Name of the doctor/s performing the procedure/s:
            </span>
            <span className="border-b border-gray-400 flex-grow"></span>
          </div>

          <div>
            <span className="font-bold">
              18. History of genetic/medical disease in the family (specify):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
              {[
                "(a) Clinical",
                "(b) Bio-chemical",
                "(c) Cytogenetic",
                "(d) Other (e.g. radiological, ultrasonography etc. Specify)",
              ].map((hist, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />
                  <span>{hist}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 w-full h-8 border border-gray-200 rounded"></div>
          </div>

          <div>
            <span className="font-bold">
              19. Indication for the diagnosis procedure ("Tick" on appropriate
              indication):
            </span>

            <div className="mt-2 pl-2 space-y-2 text-xs">
              <div>
                <span className="font-semibold">
                  A. Previous child/children with:
                </span>
                <div className="grid grid-cols-2 gap-1 mt-1 pl-4">
                  {[
                    "i. Chromosomal disorders",
                    "ii. Metabolic disorders",
                    "iii. Congenital anomaly",
                    "iv. Mental Disability",
                    "v. Haemoglobinopathy",
                    "vi. Sex linked disorders",
                    "vii. Single gene disorder",
                    "viii. Any other (specify)",
                  ].map((ind) => (
                    <label key={ind} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-3 w-3 rounded border-gray-300"
                      />
                      <span>{ind}</span>
                    </label>
                  ))}
                </div>
                <label className="flex items-center space-x-2 pl-4 mt-1">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />
                  <span>ix. Advanced maternal age (35)</span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-gray-300"
                />
                <span className="font-semibold">
                  B. Mother/Father/sibling has genetic (specify):
                </span>
                <span className="border-b border-gray-400 flex-grow"></span>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-gray-300"
                />
                <span className="font-semibold">C. Other (specify):</span>
                <span className="border-b border-gray-400 flex-grow"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-bold text-xs">
              20. Date on which consent of pregnant women/person was obtained if
              form F prescribed in PC & PNDT Act, 1994:
            </span>
            <span className="border-b border-gray-400 px-2 font-mono">
              {patientDate}
            </span>
          </div>

          <div>
            <span className="font-bold text-xs block mb-1">
              21. Invasive procedure carried out ("Tick" on appropriate
              indication/s):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs pl-2">
              {[
                "i. Chromosomal studies",
                "ii. Biochemical studies",
                "iii. Molecular Studies",
                "iv. Pre-implantation gender diagnosis",
                "v. Any other (specify)",
              ].map((p) => (
                <label key={p} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex flex-col space-y-1">
              <span className="font-bold">
                22. Any complication/s of invasive procedure (specify):
              </span>
              <div className="border border-gray-200 h-8 rounded"></div>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold">
                24. Result of the Procedures/Test carried out (report in brief):
              </span>
              <div className="border border-gray-200 h-8 rounded"></div>
            </div>
          </div>

          <div>
            <span className="font-bold text-xs block mb-1">
              23. Additional test recommended (Please mention if applicable):
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs pl-2">
              {[
                "i. Chromosomal studies",
                "ii. Biochemical studies",
                "iii. Molecular studies",
                "iv. Pre-implantation gender diagnosis",
                "v. Any other (specify)",
              ].map((p) => (
                <label key={p} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="h-3 w-3 rounded border-gray-300"
                  />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs items-center">
            <div className="flex gap-1">
              <span className="font-bold">25. Date of procedure:</span>
              <span className="border-b border-gray-400 flex-grow"></span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold">26. Result conveyed to:</span>
              <span className="border-b border-gray-400 flex-grow"></span>
            </div>
            <div className="flex gap-1">
              <span className="font-bold">27. Indication for MTP:</span>
              <span className="border-b border-gray-400 flex-grow"></span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded text-xs border border-gray-200 space-y-1">
            <div>
              <span className="font-bold">Date:</span>{" "}
              <span className="font-mono">{createdAt}</span>
            </div>
            <div>
              <span className="font-bold">Place:</span>
              <span className="italic pl-1">
                LIMRA SONOGRAPHY, Natasha Enclave, C1-001, NIBM Post Office Rd,
                Bhatnagar Colony, Kondhwa, Pune, Maharashtra 411048
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D */}
      <section className="border-t-2 border-gray-400 pt-6">
        <h3 className="bg-gray-100 px-2 py-1 font-bold border border-gray-400 mb-4">
          Section D: Declaration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {/* Patient Declaration Box */}
          <div className="border border-gray-300 p-4 rounded flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-bold border-b pb-1 mb-2 text-center uppercase tracking-tight">
                Declaration of the person undergoing prenatal diagnostic
                test/Procedure
              </h4>
              <p className="leading-relaxed">
                I,{" "}
                <span className="font-bold border-b border-gray-400 px-1">
                  {patientName}
                </span>{" "}
                declare that by undergoing Test/Procedure. I do not want to know
                the sex of my foetus.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <div>
                  <span className="font-semibold">Age:</span> {patientAge}
                </div>
                <div>
                  <span className="font-semibold">Sex:</span> Female
                </div>
              </div>
              <div className="text-[11px]">
                <span className="font-semibold">Relation (if any):</span> Self
              </div>
              <div className="text-[11px] leading-tight">
                <span className="font-semibold">Address:</span> {localAddress},{" "}
                {pincode}, {city} - {state}
              </div>
              <div className="text-[11px]">
                <span className="font-semibold">Contact No:</span>{" "}
                {patientPhone}
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 items-end">
                <div>
                  <span className="block text-[10px] text-gray-400">Date:</span>
                  <div className="border-b border-gray-300 h-5"></div>
                </div>
                <div className="text-center">
                  <div className="border border-dashed border-gray-300 h-14 w-full flex items-center justify-center text-[10px] text-gray-400 bg-gray-50/50 mb-1">
                    Thumb Impression / Sign
                  </div>
                  <span className="text-[10px] text-gray-500 block leading-tight">
                    Signature/Thumb impression of patient
                  </span>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-gray-400 italic border-t border-dashed mt-2">
                Identified by: {patientName} <br />
                Signature of person attesting thumb impression: ________________
              </div>
            </div>
          </div>

          {/* Doctor Declaration Box */}
          <div className="border border-gray-300 p-4 rounded flex flex-col justify-between space-y-4">
            <div>
              <h4 className="font-bold border-b pb-1 mb-2 text-center uppercase tracking-tight">
                Declaration of Doctor/Person Conducting Pre Natal Diagnostic
                Procedure/Test
              </h4>
              <p className="leading-relaxed">
                I,{" "}
                <span className="font-bold border-b border-gray-400 px-1">
                  {doctorName}
                </span>{" "}
                (name of the person conducting ultrasonography/image scanning)
                declare that while conducting ultrasonography/image scanning on{" "}
                <span className="font-bold border-b border-gray-400 px-1">
                  {patientName}
                </span>{" "}
                (name of the pregnant woman or the person undergoing pre natal
                diagnostic procedure/test), I have neither detected nor
                disclosed the sex of her fetus to anybody in any manner.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-end gap-4">
                <div className="w-1/3">
                  <span className="block text-[10px] text-gray-400">Date:</span>
                  <div className="border-b border-gray-300 h-5"></div>
                </div>
                <div className="w-2/3 text-center">
                  <div className="border-b border-gray-300 h-8"></div>
                  <span className="text-[10px] text-gray-500 block pt-1 font-semibold">
                    Signature
                  </span>
                </div>
              </div>
              <div className="text-[10px] text-gray-500 leading-tight bg-gray-50 p-2 rounded border border-gray-100">
                <span className="font-bold uppercase block text-[9px] text-gray-700 mb-1">
                  Doctor's Credentials Stamp Area
                </span>
                Name in Capitals, Registration Number with Seal of the
                Gynaecologist/Radiologist/Registered Medical Practitioner
                Conducting Diagnostic procedure.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
