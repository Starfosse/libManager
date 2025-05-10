import {Component, Input} from '@angular/core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-back-to',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './back-to.component.html',
  styleUrl: './back-to.component.css'
})
export class BackToComponent {
  faArrowLeft = faArrowLeft;
  @Input() backToHome = (): void => {
  };

}
