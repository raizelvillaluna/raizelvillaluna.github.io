$(document).ready(function() {
  // Array to store tasks
  let tasks = [];
  
  // Total minutes of completed tasks
  let completedMinutes = 0;

  // Tabs Functionality

  $(".tab-btn").on("click", function() {
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");
    $(".tab-content").hide();
    $("#" + $(this).data("tab")).show();
    updateProgress();
  });


  // Add Task Functionality

  $("#task-form").on("submit", function(e) {
    e.preventDefault();

    let task = {
        name: document.getElementById("taskName").value,
        priority: document.getElementById("priority").value,
        time: parseInt(document.getElementById("time").value),
        category: document.getElementById("category").value,  
        completed: false
  };

    tasks.push(task);
    renderTasks();
    this.reset();
  });


  // Render Task Table

  function renderTasks() {
    let rows = "";
    tasks.forEach((t, i) => {
      if (!t.completed) { // Only show tasks that are not completed
        rows += `
          <tr>
            <td>${t.name}</td>
            <td>${t.priority}</td>
            <td>${t.time}</td>
            <td>${t.category}</td>
            <td>
              <button class="action complete" data-index="${i}">✔</button>
              <button class="action remove" data-index="${i}">❌</button>
            </td>
          </tr>
        `;
      }
    });
    $("#taskTable tbody").html(rows);
    updateProgress();
  }


  // Task Actions (Complete & Remove)
  
  // Mark task as complete and remove from table
  $("#taskTable").on("click", ".complete", function() {
    let index = $(this).data("index");

    if (!tasks[index].completed) {
      tasks[index].completed = true;
      completedMinutes += tasks[index].time;

      // Remove the row from the table
      $(this).closest("tr").remove();

      updateProgress();
    }
  });

  // Remove task completely
  $("#taskTable").on("click", ".remove", function() {
    let index = $(this).data("index");

    if (tasks[index].completed) {
      completedMinutes -= tasks[index].time;
    }

    tasks.splice(index, 1);
    renderTasks();
  });


  // Update Progress Tab

  function updateProgress() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.completed).length;
    let remaining = total - completed;

    $("#totalTasks").text(total);
    $("#completedTasks").text(completed);
    $("#remainingTasks").text(remaining);
    $("#completedMinutes").text(completedMinutes);

    if (completed >= 5) {
      $("#quote").text("You are an excellent planner! Great Job!");
    } else {
      $("#quote").text("Keep it up! You can do it!");
    }
  }


  // Reset Functionality

  $("#resetBtn").on("click", function() {
    tasks = [];
    completedMinutes = 0;
    renderTasks();
    $("#quote").text("");
    $(".tab-btn").removeClass("active");
    $(".tab-content").hide();
    $("[data-tab='tips']").addClass("active");
    $("#tips").show();
  });
});
