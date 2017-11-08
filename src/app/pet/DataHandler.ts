module appPet {
	export class DataHandler{
		public constructor() {
		}

		public sendMessageToServer(vd:Object) {
			let tempvd = lxlPet.Tool.copyObject(vd);
			let o:Object = {action:'publicMessage', data:tempvd};
			lxlPet.Tool.callJS("sendMsg", o);
		}

		public linkLine(d:ViewData) {
			let obj = {type:'mc', data:d};
			this.sendMessageToServer(obj);
		}

		private _getMC(data:any) {
			lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(CustomEvent.MC, data as ViewData));
		}

		public getMessageFromServer(data:any) {
			lxlPet.logs.log("getMessageFromServer " + data);
			switch(data.type) {
				case "mc":
					this._getMC(data.data);
				break;
			}
		}

		public setStudentsFromServer(data:any) {
			lxlPet.logs.log("students:" + data);
			lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.GET_STUDENTS_FROM_SERVER_PET, data));
		}

		public setTeacherFromServer(data:any) {
			lxlPet.logs.log("teacher:" + data);
			lxlPet.CDispatcher.getInstance().dispatch(new lxlPet.CEvent(lxlPet.CEvent.GET_TEACHER_FROM_SERVER_PET, data));
		}

		public getWordsFromServer() {

		}
	}
}