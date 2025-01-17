import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Attribute,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  effect,
  ElementRef,
  EventEmitter,
  input,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CourseImageComponent } from '../course-image/course-image.component';
import { CourseTitleComponent } from '../course-title/course-title.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [CommonModule, CourseTitleComponent],
  encapsulation: ViewEncapsulation.Emulated,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent
  implements
    OnInit,
    AfterViewInit,
    AfterContentInit,
    OnDestroy,
    AfterContentChecked,
    AfterViewChecked,
    AfterContentInit,
    AfterViewInit,
    DoCheck
{
/*   @Input({
    required: true,
  })
  course: Course; */
  course = input<Course>({} as Course, {
    alias: 'tutorial',
  });

  @Input()
  cardIndex: number;

  @ViewChild('courseImage') // view child does not see content projected image eg:- ng-content.
  viewChildImage: any;

  @ContentChild('courseImage')
  contentChildImage: CourseImageComponent;

  @ContentChild('container') // content child does not see anything else other than content projected.
  contentChildContainer: any;

  @ContentChild(CourseImageComponent)
  contentChildCourseImageComponent: CourseImageComponent;

  @ContentChild(CourseImageComponent, { read: ElementRef })
  contentChildCourseImageElementRef: ElementRef;

  @ContentChildren(CourseImageComponent)
  contentChilderCourseImageComponent: QueryList<CourseImageComponent>;

  @Output('courseSelected')
  courseEmitter = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  @Input()
  noImageTpl: TemplateRef<any>;

  @Output('courseChanged')
  courseChangedEmitter = new EventEmitter<Course>();

  @Input()
  typeAsInput: string;

  constructor(
    private coursesService: CoursesService,
    @Attribute('type') private type: string
  ) {
    localStorage.setItem('type:', this.type);
    // console.log('typeAsInput:', this.typeAsInput);
    // console.log('constructor', this.course);
    effect(() => {
      console.log('new course value:', this.course());
    });
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit', this.viewChildImage);
    // console.log('ngAfterViewInit', this.contentChildImage);
    // console.log('ngAfterViewInit', this.contentChildContainer);
    // console.log('ngAfterViewInit', this.contentChildCourseImageElementRef);
    // console.log('ngAfterViewInit', this.contentChildCourseImageComponent);
    // console.log('ngAfterViewInit', this.contentChilderCourseImageComponent);
    // console.log('ngAfterViewInit', this.images);
    // console.log('ngAfterViewInit');
    localStorage.setItem('ngAfterViewInit', 'true');
  }

  ngAfterContentInit() {
    // console.log('ngAfterContentInit');
    localStorage.setItem('ngAfterContentInit', 'true');
  }

  ngOnInit() {
    localStorage.setItem('ngOnInit', JSON.stringify(this.coursesService));
    // console.log('id', this.coursesService.id);
    // console.log(' ngOnInit course', this.course);
    // console.log('ngOnInit');
    localStorage.setItem('ngOnInit', 'true');
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
    localStorage.setItem('ngOnDestroy', 'true');
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
    localStorage.setItem('ngAfterContentChecked', 'true');
    // this.course.iconUrl = '';
    // this.course.category = 'ADVANCED';
    // this.course.longDescription = 'ngAfterContentChecked';
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
    localStorage.setItem('ngAfterViewChecked', 'true');
    // this.course.description = 'ngAfterViewChecked';
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
    localStorage.setItem('ngDoCheck', 'true');
  }

  isImageVisible() {
    return this.course && this.course()?.iconUrl;
  }

  onCourseViewed() {
    this.courseEmitter.emit(this.course());
  }

  cardClasses() {
    if (this.course()?.category == 'BEGINNER') {
      return 'beginner';
    }
    return ''; // Fix: Add this line to handle the case when category is not 'BEGINNER'
  }

  cardStyles() {
    return {
      'background-image': 'url(' + this.course()?.iconUrl + ')',
    };
  }

  onSaveClicked(description: string) {
    const course = this.course()
    if(course) {
    this.courseChangedEmitter.emit({ ...course, description });
    }
  }

  onTitleChange(newTitle: string) {
    const course = this.course();
    if (course) {
      course.description = newTitle;
    }
  }
}
