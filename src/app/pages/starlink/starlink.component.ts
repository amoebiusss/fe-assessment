import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs';

@Component({
	selector: 'app-starlink',
	imports: [RouterModule],
	templateUrl: './starlink.component.html',
	styleUrl: './starlink.component.scss',
})
export class StarlinkComponent {
	private params = inject(ActivatedRoute).params.pipe(map(res => res['id']));
	id = toSignal(this.params);
}
