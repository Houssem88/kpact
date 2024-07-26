let estimNextSp_pts = 0; // Variable to store the result for download

function validateInputs() {
    const workingDays = document.getElementById('workingDays');
    const velocity1 = document.getElementById('velocity1');
    const velocity2 = document.getElementById('velocity2');
    const velocity3 = document.getElementById('velocity3');
    const days1 = document.getElementById('days1');
    const days2 = document.getElementById('days2');
    const days3 = document.getElementById('days3');

    // Check if any field is empty
    if (!workingDays.value || !velocity1.value || !velocity2.value || !velocity3.value || !days1.value || !days2.value || !days3.value) {
        alert('Please fill in all the fields.');
        return false;
    }

    // Calculate estimated next sprint duration in hours
    const estimatedNextSpDuration_h = workingDays.value * 8;

    // Calculate average duration of working days
    const days1_h = days1.value * 8;
    const days2_h = days2.value * 8;
    const days3_h = days3.value * 8;
    const avg_duration = (days1_h + days2_h + days3_h) / 3;

    // Calculate average velocity
    const velocity1_value = parseFloat(velocity1.value);
    const velocity2_value = parseFloat(velocity2.value);
    const velocity3_value = parseFloat(velocity3.value);
    const avg_velocity = (velocity1_value + velocity2_value + velocity3_value) / 3;

    // Calculate estimated points for the next sprint
    estimNextSp_pts = Math.floor((estimatedNextSpDuration_h * avg_velocity) / avg_duration);

    // Show the modal with calculated values
    showModal(estimatedNextSpDuration_h, avg_duration, avg_velocity, estimNextSp_pts);
}

function showModal(estimatedDuration, averageDuration, averageVelocity, estimatedPoints) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    modalText.innerHTML = `<strong style="font-size: 24px;">Estimated points for the next sprint: ${estimatedPoints} story points</strong><br>
                           <br>Estimated total working hours for next sprint: ${estimatedDuration} hours.<br>
                           Average duration of past sprints: ${averageDuration.toFixed(2)} hours.<br>
                           Average velocity of past sprints: ${averageVelocity.toFixed(2)}.`;

    // Enable the download button inside the modal
    const downloadButton = document.getElementById('downloadExcel');
    downloadButton.style.display = 'inline-block';

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function downloadCSV() {
    const workingDays = document.getElementById('workingDays').value;
    const velocity1 = document.getElementById('velocity1').value;
    const velocity2 = document.getElementById('velocity2').value;
    const velocity3 = document.getElementById('velocity3').value;
    const days1 = document.getElementById('days1').value;
    const days2 = document.getElementById('days2').value;
    const days3 = document.getElementById('days3').value;

    const csvContent = `data:text/csv;charset=utf-8,`
        + `Sprint,Velocity Done,Amount of Working Days\n`
        + `Sprint -1,${velocity1},${days1}\n`
        + `Sprint -2,${velocity2},${days2}\n`
        + `Sprint -3,${velocity3},${days3}\n`
        + `\n`
        + `Summary,,\n`
        + `Working Days for Next Sprint,,${workingDays}\n`
        + `Estimated Points for the Next Sprint,,${estimNextSp_pts}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sprint_calculator_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function downloadExcel() {
    const workingDays = document.getElementById('workingDays').value;
    const velocity1 = document.getElementById('velocity1').value;
    const velocity2 = document.getElementById('velocity2').value;
    const velocity3 = document.getElementById('velocity3').value;
    const days1 = document.getElementById('days1').value;
    const days2 = document.getElementById('days2').value;
    const days3 = document.getElementById('days3').value;

    const ws_data = [
        ["Sprint", "Velocity Done", "Amount of Working Days"],
        ["Sprint -1", velocity1, days1],
        ["Sprint -2", velocity2, days2],
        ["Sprint -3", velocity3, days3],
        [],
        ["Summary", ""],
        ["Working Days for Next Sprint", "", workingDays],
        ["Estimated Points for the Next Sprint", "", estimNextSp_pts]
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");

    XLSX.writeFile(wb, "sprint_calculator_results.xlsx");
}
