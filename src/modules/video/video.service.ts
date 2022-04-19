import { VideoModel } from './video.model';

export const createVideo = ({ owner }: { owner: string }) => {
	return VideoModel.create({ owner });
};

export const findVideo = (videoId: string) => {
	return VideoModel.findOne({ videoId });
};

export const findVideos = () => {
	return VideoModel.find({ published: true }).lean();
};
