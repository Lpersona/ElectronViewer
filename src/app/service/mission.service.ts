import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class MissionService {
	constructor() {}

	private missionSideState = new Subject();
	missionSide$ = this.missionSideState.asObservable();

	sideMission(mission: boolean) {
		this.missionSideState.next(mission);
	}
}
