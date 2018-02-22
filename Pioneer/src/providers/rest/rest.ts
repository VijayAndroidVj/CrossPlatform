import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // apiUrl = 'http://192.168.75.1/pioneer';
 apiUrl = 'http://www.itmspl.com/pioneer';// live

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getLeads(sid,bid,aid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_leads.php?sid='+sid+'&&bid='+bid+'&&aid='+aid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  addSpare(sid,bid,aid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/add_spare_part.php?cid='+sid+'&&date='+bid+'&&spare_part_count='+aid).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSales(aid,stDate,edDate,model,color,pincode) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_sales.php?start_date='+stDate+'&&end_date='+edDate+'&&aid='+aid+'&&l='+model+'&&m='+color).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getnotify(val) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/getmyoffer.php?eid='+val).subscribe(data => {
        resolve(data["offer"]);
      }, err => {
        console.log(err);
      });
    });
  }

  getChatLeads(id,sid,aid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_chatlist.php?mobile='+id+'&&sid='+sid+'&&aid='+aid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  getFeddback(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_feedback.php?aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }
  getTestDrive(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_testdrive.php?aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }
  getCService(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_customerservice.php?aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }


  getChatCountLeads(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_chatlist.php?empId='+id).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getBranch(sid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_branch.php?sid='+sid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }
  getBranchById(bid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/common.php?bid='+bid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }
  getAdmin(sid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_admin.php?sid='+sid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteAdmin(id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/delete.php?aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });

  }

  deleteBranch(id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/delete.php?bid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });

  }

  deleteLead(id){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/delete.php?eid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  getAdminById(bid) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/common.php?sid='+bid).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  getCustomerId(ids) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_custromer.php?empId='+ids).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }
  getLeadId(ids) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_leads.php?empId='+ids).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  // getSales(aid,stDate,edDate,model,color,pincode) {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'/get_sales.php?start_date='+stDate+'&&end_date='+edDate+'&&aid='+aid+'&&model='+model
  //   +'&&color='+color+'&&pincode='+pincode).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }

  getService(aid,stDate,edDate,model) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_service.php?start_date='+stDate+'&&end_date='+edDate+'&&aid='+aid+'&&model='+model).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getStock(aid,stDate,edDate,model,color) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_stock.php?start_date='+stDate+'&&end_date='+edDate+'&&aid='+aid+'&&model='+model
      +'&&color='+color).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSpare(aid,stDate,edDate) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_spare_parts.php?start_date='+stDate+'&&end_date='+edDate+'&&cid='+aid).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
getOfferLead(){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/get_leads.php?sid=1').subscribe(data => {
      resolve(data["products"]);
    }, err => {
      console.log(err);
    });
  });
  //https://itmspl.com/pioneer/get_leads.php?sid=1
}
  

  getVisitId(ids) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_visits.php?custId='+ids).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  updateStatus(ids,val) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/update_status.php?empId='+ids+'&&status='+val).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getGraph(){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/graph.php').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });

  }

  getReport(stdate,eddate,eid,status) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/report.php?st_date='+stdate+'&&ed_date='+eddate+'&&empId='+eid+'&&status='+status).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }




  addLeads(data) {

    let body = JSON.stringify(data)
    //headers = new Headers({'Content-Type': 'application/json'});
   // options = new RequestOptions({headers: headers});
return this.http.post(this.apiUrl+'/add_lead.php', body).toPromise();
  }
  addNotification(aid,title,des) {
    
    
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/send_offer.php?aid='+aid+'&&title='+title+'&&description='+des).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });

      }
  addVisit(data) {
    
        let body = JSON.stringify(data)
        //headers = new Headers({'Content-Type': 'application/json'});
       // options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl+'/add_visit.php', body).toPromise();
    
      }

    addCustomer(data) {
      let body = JSON.stringify(data)
      //headers = new Headers({'Content-Type': 'application/json'});
     // options = new RequestOptions({headers: headers});
  return this.http.post(this.apiUrl+'/add_branch.php', body).toPromise();
}
updateBranch(data,id) {
  let body = JSON.stringify(data)
  //headers = new Headers({'Content-Type': 'application/json'});
 // options = new RequestOptions({headers: headers});
return this.http.post(this.apiUrl+'/add_branch.php?id='+id, body).toPromise();
}

updateLead(data,id) {
  let body = JSON.stringify(data)
  //headers = new Headers({'Content-Type': 'application/json'});
 // options = new RequestOptions({headers: headers});
return this.http.post(this.apiUrl+'/add_lead.php?id='+id, body).toPromise();
}

adAdmin(data) {
  
        let body = JSON.stringify(data)
        //headers = new Headers({'Content-Type': 'application/json'});
       // options = new RequestOptions({headers: headers});
    return this.http.post(this.apiUrl+'/add_admin.php', body).toPromise();
  
  
  }

  addtask(data) {
    
    let body = JSON.stringify(data)
    //headers = new Headers({'Content-Type': 'application/json'});
   // options = new RequestOptions({headers: headers});
return this.http.post(this.apiUrl+'/add_task.php', body).toPromise();

  }
  getTask(id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_task.php?aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  getTaskId(ids,id) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/get_task.php?empId='+ids+'&&aid='+id).subscribe(data => {
        resolve(data["products"]);
      }, err => {
        console.log(err);
      });
    });
  }

  updatetaskStatus(ids,val) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/update_task.php?empId='+ids+'&&feedback='+val).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
