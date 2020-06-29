import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { MissionService, sideState } from "./service/mission.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	private subscription: Subscription;
	public openState: boolean;
	public openType: sideState["type"];

	constructor(private missionService: MissionService) {
		this.subscription = this.missionService.missionSide$.subscribe((state: sideState) => {
			this.openType = state.type;
			this.openState = !this.openState;
		});
	}
}
