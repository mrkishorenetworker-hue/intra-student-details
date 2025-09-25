(function(){
  emailjs.init("ShCQYHy1yIBu8aS5L"); // 🔑 Replace with your Public Key
})();

const form = document.getElementById("studentForm");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  // 1. Send details to YOU
  emailjs.sendForm("service_118fge2", "template_we1g3o4", this)
    .then(() => {
      // 2. Send confirmation email back to student
      const studentEmail = document.getElementById("email").value;
      emailjs.send("service_118fge2", "template_we1g3o4", {
        to_email: studentEmail,
        student_name: document.getElementById("name").value
      });

      // 3. Generate PDF
      generatePDF();

      successMsg.style.display = "block";
      errorMsg.style.display = "none";
      form.reset();

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    }, (error) => {
      console.error("EmailJS Error:", error);
      errorMsg.style.display = "block";
      successMsg.style.display = "none";
    });
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value;
  const department = document.getElementById("department").value;
  const year = document.getElementById("year").value;
  const native = document.getElementById("native").value;
  const fathername = document.getElementById("fathername").value;
  const fatheroccupation = document.getElementById("fatheroccupation").value;
  const maindomain = document.getElementById("maindomain").value;
  const aboutfamily = document.getElementById("aboutfamily").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Student Details", 14, 20);

  doc.autoTable({
    startY: 30,
    head: [['Field', 'Details']],
    body: [
      ['Name', name],
      ['Department', department],
      ['Year', year],
      ['Native', native],
      ["Father's Name", fathername],
      ["Father's Occupation", fatheroccupation],
      ['Main Domain', maindomain],
      ['Mobile Number', mobile],
      ['Email', email],
      ['About Family', aboutfamily]
    ],
    styles: { fontSize: 11 }
  });

  doc.save("Student_Details.pdf");
}
