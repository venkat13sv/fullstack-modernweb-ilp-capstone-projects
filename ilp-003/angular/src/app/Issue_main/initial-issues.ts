export class Init {
    load() {
      if (localStorage.getItem('issues') === null || localStorage.getItem('issues') == undefined) {
        console.log("Creating the initial set of issues ...");
        var issues = [
          {
            id: 1,
            name: "Ui-problem",
            description: "Layout design not properly loaded",
            severity: "Low",
            created_date: "20-07-2018",
            status:"closed",
            closed_date:"20-07-2018"
          },
          {
            id: 2,
            name: "Backend-server",
            description: "Server is not responding",
            severity: "High",
            created_date: "21-07-2018",
            status:"Pending",
            closed_date:"-"
          },
          {
            id: 3,
            name: "Portal-main",
            description: "My travel is not working",
            severity: "Medium",
            created_date: "21-07-2018",
            status:"Pending",
            closed_date:"-"
          }
        ];
        localStorage.setItem('issues', JSON.stringify(issues));
      }
      else {
        console.log("Loaded the issues from local storage ...");
      }
    }
  }
  