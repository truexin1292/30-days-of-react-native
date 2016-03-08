//
//  JTSImagePreview.m
//  ThirtyDaysOfReactNative
//
//  Created by 方威 on 16/3/7.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "JTSImagePreview.h"
#import "RCTLog.h"
#import "AppDelegate.h"
#import <JTSImageViewController.h>
@implementation JTSImagePreview
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(showImage:(NSString *)url)
{
  // Create image info
  JTSImageInfo *imageInfo = [[JTSImageInfo alloc] init];
  imageInfo.imageURL = [NSURL URLWithString:url];
  
  JTSImageViewController *imageViewer = [[JTSImageViewController alloc]
                                         initWithImageInfo:imageInfo
                                         mode:JTSImageViewControllerMode_Image
                                         backgroundStyle:JTSImageViewControllerBackgroundOption_None];
  
  // Get root to show from
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  UIViewController* showingController = (UIViewController*)delegate.window.rootViewController;
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [imageViewer showFromViewController:showingController transition:JTSImageViewControllerTransition_FromOffscreen];
  });
}

@end