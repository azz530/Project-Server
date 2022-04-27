/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : bs_db

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 27/04/2022 10:20:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `actime` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (6, 17, '升旗仪式', '2022-04-13 00:00:00');
INSERT INTO `activity` VALUES (7, 17, '开年级会议', '2022-04-08 00:00:00');
INSERT INTO `activity` VALUES (9, 13, '校园春游', '2022-04-08 00:00:00');
INSERT INTO `activity` VALUES (10, 15, '打豆豆', '2022-04-07 00:00:00');
INSERT INTO `activity` VALUES (11, 13, '打豆豆', '2022-04-14 00:00:00');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (1, 'http://localhost:3000/164913496033522.jpg,http://localhost:3000/16491349603091000.jpg', '2022-04-05 13:02:40');
INSERT INTO `banner` VALUES (2, 'http://localhost:3000/164913551183622.jpg,http://localhost:3000/16491355117591000.jpg', '2022-04-05 13:11:52');
INSERT INTO `banner` VALUES (3, 'http://localhost:3000/164914061316322.jpg,http://localhost:3000/1649140613178QQ浏览器截图20220317114704.png', '2022-04-05 14:36:53');
INSERT INTO `banner` VALUES (4, 'http://localhost:3000/1649140761457QQ浏览器截图20220217142647.png,http://localhost:3000/1649140761530QQ浏览器截图20220317114704.png', '2022-04-05 14:39:21');
INSERT INTO `banner` VALUES (8, 'http://localhost:3000/164914119940122.jpg', '2022-04-05 14:46:39');
INSERT INTO `banner` VALUES (9, 'http://localhost:3000/164914123302222.jpg,http://localhost:3000/16491412330131000.jpg', '2022-04-05 14:47:13');
INSERT INTO `banner` VALUES (10, 'http://localhost:3000/164914219493022.jpg,http://localhost:3000/16491421949341000.jpg', '2022-04-05 15:03:15');
INSERT INTO `banner` VALUES (11, 'http://localhost:3000/164914228041222.jpg,http://localhost:3000/16491422804411000.jpg', '2022-04-05 15:04:40');
INSERT INTO `banner` VALUES (12, 'http://localhost:3000/164914385465522.jpg,http://localhost:3000/16491438546551000.jpg,http://localhost:3000/1649143854700QQ浏览器截图20220216152629.png,http://localhost:3000/1649143854631QQ浏览器截图20220317114704.png', '2022-04-05 15:30:55');
INSERT INTO `banner` VALUES (13, 'http://localhost:3000/164914391756422.jpg', '2022-04-05 15:31:57');
INSERT INTO `banner` VALUES (14, 'http://localhost:3000/164914395082122.jpg,http://localhost:3000/16491439507521000.jpg,http://localhost:3000/1649143950739QQ浏览器截图20220317114704.png', '2022-04-05 15:32:31');
INSERT INTO `banner` VALUES (15, 'http://localhost:3000/164914398648022.jpg', '2022-04-05 15:33:06');
INSERT INTO `banner` VALUES (16, 'http://localhost:3000/164914511951222.jpg,http://localhost:3000/1649145119556QQ浏览器截图20220317114704.png,http://localhost:3000/16491451195001000.jpg', '2022-04-05 15:51:59');
INSERT INTO `banner` VALUES (17, 'http://localhost:3000/1649145587823R-C.jpg,http://localhost:3000/1649145587798OIP-C (2).jpg,http://localhost:3000/1649145587796OIP-C.jpg', '2022-04-05 15:59:48');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`class_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES (1, '一年级一班', 4155152);
INSERT INTO `class` VALUES (2, '一年级二班', 2022031101);
INSERT INTO `class` VALUES (3, '一年级三班', 2022031101);
INSERT INTO `class` VALUES (4, '一年级四班', 2022031101);
INSERT INTO `class` VALUES (5, '二年级一班', 2022031102);
INSERT INTO `class` VALUES (6, '二年级二班', 2022031102);
INSERT INTO `class` VALUES (7, '二年级三班', 2022031102);
INSERT INTO `class` VALUES (8, '二年级四班', 2022031102);
INSERT INTO `class` VALUES (9, '三年级一班', NULL);
INSERT INTO `class` VALUES (10, '三年级二班', NULL);
INSERT INTO `class` VALUES (11, '三年级三班', NULL);
INSERT INTO `class` VALUES (12, '三年级四班', NULL);
INSERT INTO `class` VALUES (13, '四年级一班', NULL);
INSERT INTO `class` VALUES (14, '四年级二班', NULL);
INSERT INTO `class` VALUES (15, '四年级三班', NULL);
INSERT INTO `class` VALUES (16, '四年级四班', NULL);
INSERT INTO `class` VALUES (17, '五年级一班', NULL);
INSERT INTO `class` VALUES (18, '五年级二班', NULL);
INSERT INTO `class` VALUES (19, '五年级三班', NULL);
INSERT INTO `class` VALUES (20, '五年级四班', NULL);
INSERT INTO `class` VALUES (21, '六年级一班', NULL);
INSERT INTO `class` VALUES (22, '六年级二班', NULL);
INSERT INTO `class` VALUES (23, '六年级三班', NULL);
INSERT INTO `class` VALUES (24, '六年级四班', NULL);

-- ----------------------------
-- Table structure for class_notice
-- ----------------------------
DROP TABLE IF EXISTS `class_notice`;
CREATE TABLE `class_notice`  (
  `notice_id` int NOT NULL,
  `notice_theme` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `notice_details` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `notice_time` datetime NOT NULL,
  `notice_status` tinyint(1) NULL DEFAULT 0,
  `teacher_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`notice_id`) USING BTREE,
  INDEX `TN_id`(`teacher_id`) USING BTREE,
  CONSTRAINT `TN_id` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class_notice
-- ----------------------------
INSERT INTO `class_notice` VALUES (26642, '看电影', '本周三下午学校组织本年级进行看电影活动', '2022-03-11 06:07:00', 1, 415515);
INSERT INTO `class_notice` VALUES (122465, '期中测试', '本学期的期中测试将于本周四开始举行', '2022-04-01 15:47:57', 1, 2022031101);
INSERT INTO `class_notice` VALUES (164542, '哈哈哈', '哈哈哈哈', '2022-03-24 00:00:00', 1, 415515);
INSERT INTO `class_notice` VALUES (165154, '春游', 'asdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', '2022-03-15 00:00:00', 1, 415515);
INSERT INTO `class_notice` VALUES (2334556, '哈师大', '啊实打实的撒', '2022-03-10 00:00:00', 0, 415515);
INSERT INTO `class_notice` VALUES (2463412, '测试', '下周五将举行测试', '2022-04-01 15:50:10', 1, 2022031101);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `course_id` int NOT NULL,
  `course_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_id` int NOT NULL,
  PRIMARY KEY (`course_id`) USING BTREE,
  INDEX `Tckey`(`teacher_id`) USING BTREE,
  CONSTRAINT `Tckey` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (235454, '历史', '一年级历史', 2022031101);
INSERT INTO `course` VALUES (245001, '语文43', '四年级三班语文课程', 2022031101);
INSERT INTO `course` VALUES (324552, '英语', '一年级英语课程', 4245566);
INSERT INTO `course` VALUES (566442, '思想政治', '三年级思想政治', 2022031104);
INSERT INTO `course` VALUES (664542, '体育', '一年级体育', 2022031105);
INSERT INTO `course` VALUES (1002133, '英语4', '四年级英语', 415515);
INSERT INTO `course` VALUES (1502320, '语文32', '三年级二班语文', 4245566);
INSERT INTO `course` VALUES (2022001, '语文2', '二年级语文', 4155152);
INSERT INTO `course` VALUES (2022002, '数学6', '六年级数学', 2022031103);
INSERT INTO `course` VALUES (2343534, '英语41', '四年级一班英语课', 2022031103);

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `course_stars` int NOT NULL,
  `work_stars` int NOT NULL,
  `think_stars` int NOT NULL,
  `public_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `ESid`(`student_id`) USING BTREE,
  INDEX `ETid`(`teacher_id`) USING BTREE,
  CONSTRAINT `ESid` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ETid` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES (1, 2022031101, 2022030704, '这段时间你的表现挺好，上课积极发言，作业认真完成，希望能继续保持', 5, 5, 5, '2022-04-02 13:25:24');
INSERT INTO `evaluate` VALUES (2, 2022031101, 1323432, '你这段时间上课偶尔会有开小差，作业写得有些马虎，希望你后面的时间能认真学习', 5, 5, 5, NULL);
INSERT INTO `evaluate` VALUES (3, 2022031101, 5654533, '做的不错下次继续努力', 5, 5, 5, NULL);
INSERT INTO `evaluate` VALUES (5, 415515, 234532, '这段时间你十分努力老师为你自豪', 5, 5, 5, '2022-04-14 19:05:10');
INSERT INTO `evaluate` VALUES (6, 415515, 234532, '哈哈哈哈', 5, 5, 5, '2022-04-14 19:05:31');
INSERT INTO `evaluate` VALUES (7, 415515, 1323432, '加油', 5, 5, 5, '2022-04-14 19:05:53');
INSERT INTO `evaluate` VALUES (8, 415515, 2245632, '继续努力', 5, 4, 4, '2022-04-14 19:16:52');
INSERT INTO `evaluate` VALUES (9, 2022031101, 2022031110, '你这段时间表现比以前好一点点，继续加油', 5, 4, 4, '2022-04-16 17:59:53');

-- ----------------------------
-- Table structure for exam
-- ----------------------------
DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam`  (
  `exam_id` int NOT NULL,
  `exam_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `exam_message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_time` date NULL DEFAULT NULL,
  `end_time` date NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`exam_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of exam
-- ----------------------------
INSERT INTO `exam` VALUES (1353234, '测试1', '测试2', '2022-04-04', '2022-04-15', '2022-04-11 14:18:37');
INSERT INTO `exam` VALUES (2235453, '期末考试', '2022年秋季学期期末考试', '2022-04-19', '2022-04-23', '2022-04-11 15:15:35');

-- ----------------------------
-- Table structure for homework
-- ----------------------------
DROP TABLE IF EXISTS `homework`;
CREATE TABLE `homework`  (
  `work_id` int NOT NULL,
  `work_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `work_details` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `work_deadline` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_id` int NULL DEFAULT NULL,
  `finish_num` int NOT NULL DEFAULT 0,
  `work_status` tinyint(1) NULL DEFAULT 0,
  `work_time` datetime NULL DEFAULT NULL,
  `end_time` datetime NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of homework
-- ----------------------------
INSERT INTO `homework` VALUES (1223, '背诵唱歌行', '啊实打实', '3', 415515, 1, 1, '2021-01-06 12:09:46', '2021-01-09 16:03:00');
INSERT INTO `homework` VALUES (1444, '啊实打实', 'a十大s', '3', 415515, 0, 1, '2022-02-16 12:09:54', '2022-02-19 16:03:17');
INSERT INTO `homework` VALUES (5221, '啊实打实', '啊实打实', '3', 415515, 1, 1, '2021-09-30 12:10:02', '2021-10-03 16:03:25');
INSERT INTO `homework` VALUES (2646, 'aaaa', '啊实打实', '7', 415515, 0, 1, '2022-03-17 13:33:03', '2022-03-24 16:03:46');
INSERT INTO `homework` VALUES (15616, '啊实打实', '啊实打实', '3', NULL, 0, NULL, NULL, NULL);
INSERT INTO `homework` VALUES (14123, '啊实打实', '啊实打实', '3', NULL, 0, NULL, NULL, NULL);
INSERT INTO `homework` VALUES (65533, '啊实打实', '啊实打实', '3', NULL, 0, NULL, NULL, NULL);
INSERT INTO `homework` VALUES (156465, '英语单词', '英语单词40个家长签字', '3', NULL, 0, 0, '2022-03-25 15:10:04', NULL);
INSERT INTO `homework` VALUES (1564652, '阿松大', 'as的啊', '3', NULL, 0, 0, '2022-03-25 15:25:58', NULL);
INSERT INTO `homework` VALUES (16232, 'as打赏', '啊实打实', '3', NULL, 0, 0, '2022-03-25 15:31:51', '2022-03-28 15:31:51');
INSERT INTO `homework` VALUES (465237, '数学练习册', '数学练习册第3到第4页的计算题', '7', 2022031101, 1, 1, '2022-04-01 14:07:02', '2022-04-08 14:07:02');
INSERT INTO `homework` VALUES (2454632, '背诵单词', '背英语单词40个，家长签字', '3', 2022031101, 1, 1, '2022-04-04 13:10:05', '2022-04-07 13:10:05');
INSERT INTO `homework` VALUES (230120, '复习', '复习历史课本第二十页内容', '1', 2022031101, 0, 1, '2022-04-16 18:36:38', '2022-04-17 18:36:38');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (3, '年级大会', 'http://localhost:3000/164905675046522.jpg,http://localhost:3000/16490567505381000.jpg', '2022-04-04 15:19:10', '本周四下午在阶梯教师举行三年级的年级大会，所有同学必须到场。');
INSERT INTO `notice` VALUES (4, '期中考试', 'http://localhost:3000/16490568963291000.jpg,http://localhost:3000/1649056896354QQ浏览器截图20220317114704.png', '2022-04-04 15:21:36', '本学期的期中考试将于下下周三举行，请同学们认真复习');
INSERT INTO `notice` VALUES (5, '数学竞赛', 'http://localhost:3000/164913128963722.jpg,http://localhost:3000/16491312896561000.jpg', '2022-04-05 12:01:30', '热烈庆祝我校三年级四班的哈哈哈同学获得南宁市数学竞赛第一名');
INSERT INTO `notice` VALUES (6, '我校常委书记发表重要讲话', 'http://localhost:3000/1649233162381R-C.jpg', '2022-04-06 16:19:22', '2022年4月1日，我校常委书记出席某某某会议，发表重要讲话，书记说，正值清明假期，全校师生员工放假回家，出行要注意安全，外出做好防护，希望大家能安全地、快乐地度过清明假期。');
INSERT INTO `notice` VALUES (7, '我校近期将有市教育局的领导来我校进行教学讲解', 'http://localhost:3000/1649307050329bac7bdae61edd36a.jpg', '2022-04-07 12:50:50', '请各个班级做好日常教学活动，各位老师抓好课堂纪律，各位同学认真配合老师的教学工作');
INSERT INTO `notice` VALUES (8, '公告3', 'http://localhost:3000/1649308022967d81549808686e620.jpg', '2022-04-07 13:07:03', '测试');
INSERT INTO `notice` VALUES (9, '公告4', 'http://localhost:3000/1649308128224d81549808686e620.jpg', '2022-04-07 13:08:48', '测试');
INSERT INTO `notice` VALUES (10, '公告5', 'http://localhost:3000/1649308222884bac7bdae61edd36a.jpg', '2022-04-07 13:10:23', '测试');
INSERT INTO `notice` VALUES (11, '公告6', 'http://localhost:3000/1649308232333d81549808686e620.jpg', '2022-04-07 13:10:32', '测试');
INSERT INTO `notice` VALUES (12, '公告7', 'http://localhost:3000/1649308242989824b0efdc8b21d81.jpg', '2022-04-07 13:10:43', '测试');
INSERT INTO `notice` VALUES (13, '公告8', 'http://localhost:3000/164930825358022.jpg', '2022-04-07 13:10:54', '测试');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `student_id` int NOT NULL,
  `score` int NULL DEFAULT NULL,
  `exam_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `SidCourse`(`student_id`) USING BTREE,
  INDEX `StdCid`(`course_id`) USING BTREE,
  INDEX `ssss`(`exam_id`) USING BTREE,
  CONSTRAINT `SidCourse` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ssss` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`exam_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `StdCid` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (3, 2022002, 2022030704, 54, 2235453);
INSERT INTO `score` VALUES (4, 566442, 2022030704, 54, 2235453);
INSERT INTO `score` VALUES (5, 324552, 2022030704, 54, 2235453);
INSERT INTO `score` VALUES (6, 2022001, 2022030704, 54, 2235453);
INSERT INTO `score` VALUES (8, 1002133, 1323432, 90, 1353234);
INSERT INTO `score` VALUES (12, 1002133, 2022030704, 60, 1353234);
INSERT INTO `score` VALUES (13, 1002133, 1521232, 75, 1353234);
INSERT INTO `score` VALUES (14, 1002133, 2245632, NULL, NULL);
INSERT INTO `score` VALUES (15, 1002133, 4521332, NULL, NULL);
INSERT INTO `score` VALUES (16, 235454, 234532, 60, 2235453);
INSERT INTO `score` VALUES (17, 235454, 1323432, 50, 2235453);
INSERT INTO `score` VALUES (18, 235454, 1521232, 90, 2235453);
INSERT INTO `score` VALUES (19, 235454, 2245632, 99, 2235453);
INSERT INTO `score` VALUES (20, 235454, 4521332, 65, 2235453);
INSERT INTO `score` VALUES (21, 235454, 5654533, 75, 2235453);
INSERT INTO `score` VALUES (22, 235454, 16566423, NULL, NULL);
INSERT INTO `score` VALUES (23, 235454, 26413235, NULL, NULL);
INSERT INTO `score` VALUES (24, 235454, 151231321, NULL, NULL);
INSERT INTO `score` VALUES (25, 235454, 254542323, NULL, NULL);
INSERT INTO `score` VALUES (26, 235454, 2022031107, NULL, NULL);
INSERT INTO `score` VALUES (27, 2022002, 553644234, NULL, NULL);
INSERT INTO `score` VALUES (28, 2022002, 2022030702, NULL, NULL);
INSERT INTO `score` VALUES (29, 2022002, 2022031108, NULL, NULL);
INSERT INTO `score` VALUES (32, 2022001, 2022030805, NULL, NULL);
INSERT INTO `score` VALUES (33, 324552, 2022031109, NULL, NULL);
INSERT INTO `score` VALUES (34, 324552, 2022030805, NULL, NULL);
INSERT INTO `score` VALUES (35, 1002133, 234532, NULL, NULL);
INSERT INTO `score` VALUES (36, 1002133, 16566423, NULL, NULL);
INSERT INTO `score` VALUES (37, 1002133, 151231321, NULL, NULL);
INSERT INTO `score` VALUES (38, 1002133, 254542323, NULL, NULL);
INSERT INTO `score` VALUES (39, 1002133, 2022031107, NULL, NULL);
INSERT INTO `score` VALUES (43, 2022001, 416121, NULL, NULL);
INSERT INTO `score` VALUES (44, 2022001, 2022030701, NULL, NULL);
INSERT INTO `score` VALUES (103, 235454, 553644234, NULL, NULL);
INSERT INTO `score` VALUES (104, 235454, 2022030702, NULL, NULL);
INSERT INTO `score` VALUES (105, 235454, 2022030806, NULL, NULL);
INSERT INTO `score` VALUES (106, 235454, 2022031108, NULL, NULL);
INSERT INTO `score` VALUES (107, 235454, 2022030703, NULL, NULL);
INSERT INTO `score` VALUES (108, 235454, 2022031110, NULL, NULL);
INSERT INTO `score` VALUES (109, 235454, 2022031111, NULL, NULL);
INSERT INTO `score` VALUES (110, 235454, 2022030704, NULL, NULL);
INSERT INTO `score` VALUES (111, 245001, 234532, NULL, NULL);
INSERT INTO `score` VALUES (112, 245001, 1323432, NULL, NULL);
INSERT INTO `score` VALUES (113, 245001, 1521232, NULL, NULL);
INSERT INTO `score` VALUES (114, 245001, 2245632, NULL, NULL);
INSERT INTO `score` VALUES (115, 245001, 4521332, NULL, NULL);
INSERT INTO `score` VALUES (116, 245001, 5654533, NULL, NULL);
INSERT INTO `score` VALUES (117, 245001, 16566423, NULL, NULL);
INSERT INTO `score` VALUES (118, 245001, 26413235, NULL, NULL);
INSERT INTO `score` VALUES (119, 245001, 151231321, NULL, NULL);
INSERT INTO `score` VALUES (120, 245001, 254542323, NULL, NULL);
INSERT INTO `score` VALUES (121, 245001, 2022031107, NULL, NULL);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `student_id` int NOT NULL,
  `student_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`student_id`) USING BTREE,
  INDEX `class_id`(`class_id`) USING BTREE,
  CONSTRAINT `class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (234532, '阿三打撒', '男', '2022-03-07', '啊是大飒飒打赏大', 1);
INSERT INTO `student` VALUES (416121, '啊实打实', '男', '2022-03-13', '阿松大', 7);
INSERT INTO `student` VALUES (1323432, '健康卡', '女', '2022-03-14', '阿三打撒', 1);
INSERT INTO `student` VALUES (1521232, '阿三打撒', '男', '2022-03-20', '阿三打撒十大', 1);
INSERT INTO `student` VALUES (2245632, '阿三打撒', '男', '2022-03-17', '阿三打撒', 1);
INSERT INTO `student` VALUES (3201563, '朱康乐', '男', '2022-04-11', '广西玉林', 7);
INSERT INTO `student` VALUES (4521332, '超萌', '女', '2022-03-08', '阿三打撒撒旦撒', 1);
INSERT INTO `student` VALUES (5654533, '连连看', '男', '2022-03-14', '阿三打撒', 1);
INSERT INTO `student` VALUES (16566423, '阿松大', '男', '2022-03-21', '啊倒萨', 1);
INSERT INTO `student` VALUES (26413235, '花花', '女', '2011-03-22', '翻斗大街翻斗花园2222号', 1);
INSERT INTO `student` VALUES (151231321, '阿雅', '女', '2022-03-16', '阿萨大四女生答案', 1);
INSERT INTO `student` VALUES (254542323, '小青', '男', '2022-03-15', '哈啥萨达撒', 1);
INSERT INTO `student` VALUES (553644234, '张天爱', '女', '2013-03-06', '北京市朝阳区', 4);
INSERT INTO `student` VALUES (2022030701, '测试', '女', '2005-03-08', '水水水水', 7);
INSERT INTO `student` VALUES (2022030702, '李四', '男', '2007-03-15', '啊是多久啊客户', 4);
INSERT INTO `student` VALUES (2022030703, '佩奇', '男', '2022-03-15', 'asdas', 3);
INSERT INTO `student` VALUES (2022030704, '学生1', '男', '2008-03-14', '西藏布达拉宫', 8);
INSERT INTO `student` VALUES (2022030805, '学生2', '男', '2009-04-01', '美国华盛顿', 8);
INSERT INTO `student` VALUES (2022030806, '学生3', '女', '2008-03-13', '美国纽约911大厦', 4);
INSERT INTO `student` VALUES (2022031107, '学生4', '男', '2022-03-30', '河南石家庄', 1);
INSERT INTO `student` VALUES (2022031108, '学生5', '男', '2008-03-12', '湖南长沙雨花区', 4);
INSERT INTO `student` VALUES (2022031109, '学生6', '男', '2007-02-15', '广西柳州广西科技大学', 6);
INSERT INTO `student` VALUES (2022031110, '学生7', '女', '2014-03-13', '广东省广州市天河区', 3);
INSERT INTO `student` VALUES (2022031111, '学生8', '男', '2013-03-06', '广西南宁江南区', 3);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `teacher_id` int NOT NULL,
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birthday` date NULL DEFAULT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (415515, '陈天放', '男', '广西南宁', '2000-01-10');
INSERT INTO `teacher` VALUES (2334572, '贾楠仁', '女', '广西玉林', '2009-04-23');
INSERT INTO `teacher` VALUES (4155152, '费青', '男', '广西桂林', '1989-02-13');
INSERT INTO `teacher` VALUES (4245566, '朱紫琳', '女', '广西钦州', '2000-06-14');
INSERT INTO `teacher` VALUES (2022031101, '陈平衍', '男', '广西防城港', '1999-06-02');
INSERT INTO `teacher` VALUES (2022031102, '李梦蝶', '女', '江西南昌', '2001-04-04');
INSERT INTO `teacher` VALUES (2022031103, '黄青言', '男', '广西玉林', '1994-06-07');
INSERT INTO `teacher` VALUES (2022031104, '清舟', '男', '广东佛山', '2002-05-07');
INSERT INTO `teacher` VALUES (2022031105, '何如故', '男', '北京朝阳', '2000-05-01');
INSERT INTO `teacher` VALUES (2022041602, '李清泉', '男', '广东顺德', '1981-01-28');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `identity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `usersign` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tags` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `identity_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (7, '张三1', '$2a$10$VF/FzTJGfS4UNrrisY7U0uDrNBqv4GVLbjmWNGQ7AnDw5Qf343BA2', NULL, '学生', NULL, 'ddddd,ssss,aaaa', '2022-04-04', '广西南宁西乡塘区鲁班路', '男', 2022030805);
INSERT INTO `users` VALUES (8, '花非花', '$2a$10$/LZ9KKNJ83OylCLifgk.Ye2eVWBTd80DCydaNEpxUIHaCzOcBDFu2', 'http://localhost:3000/164809467013822.jpg', '学生', '人无完人,但会完蛋', 'asdsa,ssss', '2014-03-10', '广西柳州市东环大道268号', '女', 2022030701);
INSERT INTO `users` VALUES (9, '松鼠', '$2a$10$2aS242g5SOQw8ZA0o3naAO2jega9gePw1qu/9Oy.5Ka1VmLXhKle.', 'http://localhost:3000/164981665053512.jpg', '家长', '到此一游', '运动达人', '2022-04-10', '广西南宁邕宁区', '男', NULL);
INSERT INTO `users` VALUES (10, '谢谢', '$2a$10$/fQksQ0/vy3tFyq6snERa.GUgho3MDnT7wf42gWXqJAmVDrlHGD9i', NULL, '学生', NULL, '', NULL, NULL, NULL, 2022030703);
INSERT INTO `users` VALUES (13, '朝花夕拾', '$2a$10$NM11kLy2UOrluk9mj75z8.S/CgHVBt271Ne7HPoGoS6JcyQ/WHV/2', 'http://localhost:3000/165034672977812.jpg', '学生', '哈哈哈哈', '宅男,原皮,杀杀杀,啊啊啊,阿松大', '2022-03-16', '阿富汗伊拉克', '男', 2022030704);
INSERT INTO `users` VALUES (15, '灰烬', '$2a$10$XNnxkMoVvjOpVZ5kMrkrBOTvtWoUyZL1fMeu6Avj2mjSM/QMLrWwy', 'http://localhost:3000/16490481552011000.jpg', '老师', '人生如戏,灿若夏花', '眼镜男,喜剧演员,哈哈哈', '1999-03-10', '广西南宁邕宁区555', '男', 2022031101);
INSERT INTO `users` VALUES (16, 'assault', '$2a$10$WfZZvPcw8vvCO0l5sxcUd.LB/QX2uLtVZgEakzgD4PSwa4Eo7OOTe', NULL, '学生', NULL, '', NULL, NULL, NULL, NULL);
INSERT INTO `users` VALUES (17, 'admin', '$2a$10$V/odzcHT92BUu4W.N5MAV.byPnsfCPXCLY42zJarA2/mfxvqS4zP6', 'http://localhost:3000/1649653595967123.jpg', '管理员', '世上无难事怕有心人', '无语,哈哈,asdas', '2021-11-25', '广西桂林', '男', NULL);
INSERT INTO `users` VALUES (18, '酷酷酷', '$2a$10$jnht0I9fjTfUShbgvdT7dugZUBfS6z7dbHm9Uh3bqFnJPt8AFykVy', 'http://localhost:3000/164904765190122.jpg', '学生', '好好学习天天向上', '学生,美食家', '2014-04-16', '广西南宁邕宁区', '男', 553644234);
INSERT INTO `users` VALUES (19, '无心', '$2a$10$kA9xDM4LWeNlTUHO7IEA0ebskPpggwyLph7ozFfa6.5XfVjfl1KT2', 'http://localhost:3000/164966322091012.jpg', '学生', '我长大要当宇航员', NULL, '2022-04-17', '广东省广州市增城区', '男', 4521332);
INSERT INTO `users` VALUES (20, '青青', '$2a$10$dMXPP/VDip1B16Z89SwbheBMxHtFxwpHoeTXew/VD5yMAErO4uaOK', 'http://localhost:3000/164992598805012.jpg', '老师', '我想要个好运气', NULL, '1992-04-16', '广西柳州城中区', '女', 2022031104);
INSERT INTO `users` VALUES (21, '艾小米', '$2a$10$wHue.itFTUKHFhLdlXtHgu./MI8KKW9b3fEfF82u8VF1f2yWfrTVm', 'http://localhost:3000/164993086036422.jpg', '老师', '听我说谢谢你因为有你世界才美丽', '跑步达人', '1997-05-03', '湖南省长沙市雨花区', '女', 415515);

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES (10, 'http://localhost:3000/1649483289449语文文言文.mp4', '2022-04-09 13:48:10');
INSERT INTO `video` VALUES (11, 'http://localhost:3000/1649483673803语文文言文.mp4', '2022-04-09 13:54:34');
INSERT INTO `video` VALUES (30, 'http://localhost:3000/1649488891126语文.mp4', '2022-04-09 15:21:31');

-- ----------------------------
-- Table structure for workinfo
-- ----------------------------
DROP TABLE IF EXISTS `workinfo`;
CREATE TABLE `workinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `work_id` int NOT NULL,
  `finishStatus` tinyint(1) NULL DEFAULT 0,
  `work_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `work_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `time` datetime NULL DEFAULT NULL,
  `stars` int NULL DEFAULT NULL,
  `eva_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `eva_status` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of workinfo
-- ----------------------------
INSERT INTO `workinfo` VALUES (6, 2022030704, 2646, 1, 'http://localhost:3000/164827982310422.jpg,http://localhost:3000/16482798231351000.jpg', '阿三打撒', '2022-03-16 13:55:04', NULL, NULL, NULL);
INSERT INTO `workinfo` VALUES (7, 2022030704, 1444, 1, 'http://localhost:3000/164827984657322.jpg,http://localhost:3000/1648279846525QQ浏览器截图20220317114704.png', '顶顶顶顶顶顶顶', '2022-04-20 13:55:13', NULL, NULL, NULL);
INSERT INTO `workinfo` VALUES (8, 2022030704, 2646, 1, 'http://localhost:3000/1648279904872QQ浏览器截图20220216152629.png', '阿三打撒', '2022-04-06 13:55:18', NULL, NULL, NULL);
INSERT INTO `workinfo` VALUES (11, 2022030704, 5221, 1, 'http://localhost:3000/16490424294731000.jpg', 'sadasas', '2022-03-14 13:55:22', NULL, NULL, NULL);
INSERT INTO `workinfo` VALUES (12, 2022030704, 1223, 1, 'http://localhost:3000/164904414835122.jpg,http://localhost:3000/16490441483691000.jpg', 'sdasas', '2022-03-06 13:55:26', NULL, NULL, NULL);
INSERT INTO `workinfo` VALUES (13, 2022030704, 465237, 1, 'http://localhost:3000/164904489429122.jpg', '哈哈哈哈哈', '2022-04-13 13:55:34', 5, '做得不错', 1);
INSERT INTO `workinfo` VALUES (14, 2022030704, 2454632, 1, 'http://localhost:3000/16490491518471000.jpg', '已背诵,家长签字', '2022-03-25 13:55:39', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
