#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "util.h"

void
merge(int arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1;
    printf("N1: %d\n", n1);
    int n2 =  r - m;
    printf("N2: %d\n", n2);


    // Create temp arrays
    int L[n1], R[n2];

    // Copy data to temp arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1+ j];

     // Merge the temp arrays back into arr[l..r]

     i = 0; // Initial index of first subarray
     j = 0; // Initial index of second subarray
     k = l; // Initial index of merged subarray

     while (i < n1 && j < n2)
     {
         if (L[i] <= R[j])
         {
             arr[k] = L[i];
             i++;
         }
         else
         {
             arr[k] = R[j];
             j++;
         }
         k++;
     }

     // Copy the remaining elements of L[], if there are any
     while (i < n1)
     {
         arr[k] = L[i];
         i++;
         k++;
     }

     // Copy the remaining elements of R[], if there are any
     while (j < n2)
     {
         arr[k] = R[j];
         j++;
         k++;
     }
 }

// l is for left index and r is right index of the
// sub-array of arr to be sorted

void
mergeSort(int arr[], int l, int r)
{
    if (l < r)
    {
        // Same as (l+r)/2, but avoids overflow for large l and h
        int m = (r+l)/2;

        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m+1, r);

        merge(arr, l, m, r);
     }
 }


int main(int argc, char **argv){
    int counter = 0;
    int array[7] = {123, 60,678 -2, -89, -643, 674};
    printf("BEFORE SORT:\n");
    srand(4);
    printf("\n");
    mergeSort(array, 0, 7);
    printf("AFTER SORT:\n");
    for(counter=0;counter < 7; counter++){
        printf("%d ", array[counter]);
    }
    printf("\n");
    return 0;
}
