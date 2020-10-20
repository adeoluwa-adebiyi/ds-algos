#include <stdio.h>
#include <math.h>
#include <stdlib.h>
#include <stdbool.h>


void swap(int *array, int i, int j);
int partition(int *array, int start, int end);
void quicksort(int *array, int start, int end);

void swap(int *array, int i, int j){
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

int partition(int *array, int start, int end){
    int i = start;
    int j = end;
    int pivot = floor(((start+end)/2.0));
    while(true){

        while(array[i] < array[pivot]){
            i++;
        }

        while(array[j] > array[pivot]){
            j--;
        }

        if(i >= j){
            return j;
        }

        swap(array, i, j);
    }
}

void quicksort(int *array, int start, int end){
    if(start < end){
        int pivot = partition(array, start, end);
        quicksort(array, start, pivot);
        quicksort(array, pivot+1, end);
    }
}

int main(int argc, char **argv){
    int counter = 0;
    int array[20];
    printf("BEFORE SORT:\n");
    for(;counter < 20; counter++){
        array[counter] = rand();
        printf("%d ", array[counter]);
    }
    printf("\n");
    quicksort(array, 0, 20-1);

    printf("AFTER SORT:\n");
    for(counter=0;counter < 20; counter++){
        printf("%d ", array[counter]);
    }
    printf("\n");
    return 0;
}