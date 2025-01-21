import {User} from "@/types/user.types";
import UserService from "@/service/user-service";
import {Jam, JamDTO} from "@/types/jam.types";
import {Comment} from "@/types/comment.types";


const JamMapper = {
    toJam: async (token, jamDTO: JamDTO): Promise<Jam> => {
        try {
            const host: User = await UserService.getUserById(token, jamDTO.hostId);

            const participants: User[] = await Promise.all(
                jamDTO.participants.map((participantId) =>
                    UserService.getUserById(token, participantId)
                )
            );
            // TODO
            // const comments = await CommentService.getCommentsByIds(jamDTO.messages);
            const comment1: Comment = {
                author: host, content: "test", id: 0
            }

            const comments = [comment1]

            // Transformation en Jam
            const jam: Jam = {
                name: jamDTO.name,
                host: host,
                status: jamDTO.status,
                background: require("@/assets/images/music-exemple.png"),
                description: `Jam organisée par ${host.name}`,
                participants: participants,
                themes: jamDTO.themes,
                comments: comments,
                likes: 0,
                scheduledDate: jamDTO.scheduledDate,
            };

            return jam;
        } catch (error) {
            console.error("Erreur lors du mappage de JamDTO vers Jam :", error);
            throw error;
        }
    },

    toDTO:(jam: Jam): JamDTO => {
        let jamDTO: JamDTO = {
            hostId: jam.host.id,
            messages: jam.comments.map(comment => {
                return comment.id;
            }),
            name: jam.name,
            participants: jam.participants.map(participant => {
                return participant.id;
            }),
            scheduledDate: jam.scheduledDate,
            status: jam.status,
            themes: jam.themes
        };
        return jamDTO
    }
}
export default JamMapper;
