import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type sideState = {
	type: "map" | "tile";
	state: boolean;
};

@Injectable({
	providedIn: "root",
})
export class MissionService {
	constructor() {}

	private missionSideState = new Subject();
	missionSide$ = this.missionSideState.asObservable();

	sideMission(mission: sideState) {
		this.missionSideState.next(mission);
	}
}
