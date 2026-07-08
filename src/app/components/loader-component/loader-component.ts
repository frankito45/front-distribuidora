import { Component, Input } from '@angular/core';
import { Spiner } from "../../shared/spiner/spiner";

@Component({
  selector: 'app-loader-component',
  imports: [Spiner],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css',
})
export class LoaderComponent {
  @Input({ required: true })
  loading!: boolean;
}
