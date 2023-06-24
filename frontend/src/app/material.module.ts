import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import {
	MAT_FORM_FIELD_DEFAULT_OPTIONS,
	MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
	],
	imports: [
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: {
				appearance: 'outline',
			},
		}
	],
})
export class MaterialModule {

}
