module appPet {
	export class PetManager {
		public constructor() {
		}

		viewData:ViewData = new ViewData();
		dataHandler:DataHandler = new DataHandler();
		dataArr:Array<boolean> = [];

		private static _qipan:PetManager;
		public static getInstance():PetManager {
			if(this._qipan == null)
				this._qipan = new PetManager();
			return this._qipan;
		}
	}
}