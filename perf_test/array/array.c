#include<cstdio>
#include<ctime>

#define ARR_LEN 1000000
#define READS 1000000

int x[ARR_LEN];
int reads[READS];

int main () {
  clock_t time = clock();
  x[0] = 19;
  for (int i = 1; i <= ARR_LEN; i++)
    x[i] = ((x[i - 1] * 23) + 53) % 22695477;


  reads[0] = 23;
  for (int i = 1; i < READS; i++)
    reads[i] = (((reads[i - 1] * 17) + 37) % 1664525) % 100000;

  for (int i = 0; i < READS; i++) {
    ++x[reads[i]];
  }
  printf("time: %ld %ld %lf\n", time, clock(), ((double)clock() - time)/CLOCKS_PER_SEC);
  // console.log(new Date() - time);
}
