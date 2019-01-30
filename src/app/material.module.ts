import { NgModule } from "@angular/core";
import {MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatDatepickerModule,
    MatNativeDateModule, MatCheckbox, MatCheckboxModule,  MatToolbarModule, 
     MatSidenavModule, MatListModule, MatExpansionModule,  MatRadioModule, MatTabsModule, MatCardModule, MatTableModule, MatDialogModule, MatFooterCell, MatGridListModule, MatSelectModule, MatStepperModule, MatAutocompleteModule, MatChipsModule} from '@angular/material'

@NgModule({
    imports:[MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,MatDatepickerModule,
        MatNativeDateModule,MatCheckboxModule,MatToolbarModule,MatSidenavModule,MatListModule,
        MatExpansionModule,MatRadioModule,MatIconModule,MatTabsModule,MatCardModule,MatTableModule,
    MatDialogModule,MatGridListModule,MatSelectModule,MatStepperModule,MatAutocompleteModule,
    MatChipsModule,MatCheckboxModule],

    exports:[MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,MatDatepickerModule
    ,MatNativeDateModule,MatCheckboxModule,MatToolbarModule,MatSidenavModule,MatListModule
    ,MatExpansionModule,MatRadioModule,MatIconModule,MatIconModule,MatTabsModule,MatCardModule
    ,MatTableModule,MatDialogModule,MatGridListModule,MatSelectModule,MatStepperModule,
    MatAutocompleteModule,MatChipsModule,MatCheckboxModule]
})
export class MaterialModule {}