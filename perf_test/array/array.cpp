#include<cstdio>
#include<cstdlib>
#include<ctime>
#include<vector>

#define ARR_LEN 1000000
#define READS 1000000

int main () {
  clock_t time = clock();
  int *x = (int *)malloc(ARR_LEN * sizeof(int));
  int *reads = (int *)malloc(READS * sizeof(int));

  x[0] = 19;
  for (int i = 1; i <= ARR_LEN; i++)
    x[i] = ((x[i - 1] * 23) + 53) % 22695477;


  reads[0] = 23;
  for (int i = 1; i < READS; i++)
    reads[i] = (((reads[i - 1] * 17) + 37) % 1664525) % 100000;

  for (int i = 0; i < READS; i++) {
    ++x[reads[i]];
  }
  printf("CPS: %ld\n", CLOCKS_PER_SEC);
  printf("time: %ld %ld %lf\n", time, clock(), ((double)clock() - time)/CLOCKS_PER_SEC);
  // console.log(new Date() - time);
}
