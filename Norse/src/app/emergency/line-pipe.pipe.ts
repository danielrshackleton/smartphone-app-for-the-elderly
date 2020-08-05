import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linePipe'
})
export class LinePipePipe implements PipeTransform {


    transform(str: string) {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}
