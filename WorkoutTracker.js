export default class WorkoutTracker {
    constructor(root) {
        this.root = root;
        this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());
        this.entries = [];

        this.loadEntries();
        this.updateView();

        this.root.querySelector(".tracker-add").addEventListener("click", () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDay().toString().padStart(2, "0");

            this.addEntry({
                date: `${ year }-${ month }-${ day }`,
                workout: "bench-press",
                weight: 0,
                set1: 0,
                set2: 0,
                set3: 0,
                set4: 0
            });
        });
    }

    static html() {
        return `
            <table class="tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Exercise</th>
                        <th>Weight</th>
                        <th>Set 1</th>
                        <th>Set 2</th>
                        <th>Set 3</th>
                        <th>Set 4</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="tracker-entries">

                </tbody>

                <tbody>
                    <tr class="tracker-row tracker-row-add">
                        <td colspan="8">
                            <button type="button" class="tracker-add">Add Entry &plus;</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    static rowHtml() {
        return `
            <tr class="tracker-row">
                <td>
                    <input type="date" class="tracker-date">
                </td>
                <td>
                    <select class="tracker-workout">
                        <option value="bench-press">Barbell Bench Press</option>
                        <option value="incline-dumbbell-press">Incline Dumbbell Press</option>
                        <option value="barbell-row">Barbell Row</option>
                        <option value="lat-pulldown">Lat Pulldown</option>
                        <option value="overhead-press">Overhead Press</option>
                        <option value="barbell-curl">Barbell Curl</option>
                        <option value="skullcrusher">Skullcrusher</option>
                        <option value="squat">Squat</option>
                        <option value="deadlift">Deadlift</option>
                        <option value="leg-press">Leg Press</option>
                        <option value="hamstring-curl">Hamstring Curl</option>
                        <option value="seated-calf-raise">Seated Calf Raise</option>
                        <option value="incline-barbell-bench-press">Incline Barbell Bench Press</option>
                        <option value="dumbbell-bench-press">Dumbbell Bench Press</option>
                        <option value="seated-cable-row">Seated Cable Row</option>
                        <option value="dumbbell-row">Dumbbell Row</option>
                        <option value="dumbbell-side-raise">Dumbbell Side Raise</option>
                        <option value="seated-incline-dumbbell-curl">Seated Incline Dumbbell Curl</option>
                        <option value="cable-tricep-extension">Cable Tricep Extension</option>
                        <option value="front-squat">Front Squat</option>
                        <option value="romanian-deadlift">Romanian Deadlift</option>
                        <option value="quad-extension">Quad Extension</option>
                        <option value="hip-thrust">Hip Thrust</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="tracker-weight">
                    <span class="tracker-text">kg</span>
                </td>
                <td>
                    <input type="number" class="tracker-set1">
                    <span class="tracker-text">reps</span>
                </td>
                <td>
                    <input type="number" class="tracker-set2">
                    <span class="tracker-text">reps</span>
                </td>
                <td>
                    <input type="number" class="tracker-set3">
                    <span class="tracker-text">reps</span>
                </td>
                <td>
                    <input type="number" class="tracker-set4">
                    <span class="tracker-text">reps</span>
                </td>
                <td>
                    <button type="button" class="tracker-delete">&times;</button>
                </td>
            </tr>
        `;
    }

    loadEntries() {
        this.entries = JSON.parse(localStorage.getItem("workout-tracker-entries") || "[]");
    }

    saveEntries() {
        localStorage.setItem("workout-tracker-entries", JSON.stringify(this.entries));
    }

    updateView() {
        const tableBody = this.root.querySelector(".tracker-entries");
        const addRow = data => {
            const template = document.createElement("template");
            let row = null;
            
            template.innerHTML = WorkoutTracker.rowHtml().trim();
            row = template.content.firstElementChild;

            row.querySelector(".tracker-date").value = data.date;
            row.querySelector(".tracker-workout").value = data.workout;
            row.querySelector(".tracker-weight").value = data.weight;
            row.querySelector(".tracker-set1").value = data.set1;
            row.querySelector(".tracker-set2").value = data.set2;
            row.querySelector(".tracker-set3").value = data.set3;
            row.querySelector(".tracker-set4").value = data.set4;

            row.querySelector(".tracker-date").addEventListener("change", ({ target }) => {
                data.date = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-workout").addEventListener("change", ({ target }) => {
                data.workout = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-weight").addEventListener("change", ({ target }) => {
                data.weight = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-set1").addEventListener("change", ({ target }) => {
                data.set1 = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-set2").addEventListener("change", ({ target }) => {
                data.set2 = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-set3").addEventListener("change", ({ target }) => {
                data.set3 = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-set4").addEventListener("change", ({ target }) => {
                data.set4 = target.value;
                this.saveEntries();
            });

            row.querySelector(".tracker-delete").addEventListener("click", () => {
                this.deleteEntry(data);
            });

            tableBody.appendChild(row);
        };

        tableBody.querySelectorAll(".tracker-row").forEach(row => {
            row.remove();
        });

        this.entries.forEach(data => addRow(data));
    }

    addEntry(data) {
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    }

    deleteEntry(dataToDelete) {
        this.entries = this.entries.filter(data => data !== dataToDelete);
        this.saveEntries();
        this.updateView();
    }
}