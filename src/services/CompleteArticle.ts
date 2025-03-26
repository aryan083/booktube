import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Toggles the completion status of an article to true
 * @param article_id The ID of the article to mark as completed
 * @returns Promise with the updated article data and any error
 */
export const toggleArticleCompletion = async (article_id: string) => {
  try {
    console.log('Toggling article completion status...', article_id);

    const { data, error } = await supabase
      .from('articles')
      .update({ is_completed: true })
      .eq('article_id', article_id)
      .select();

    if (error) {
      console.error('Error updating article completion status:', error);
      return { data: null, error: error.message };
    }

    if (!data || data.length === 0) {
      console.warn('No article found with the provided ID');
      return { data: null, error: 'Article not found' };
    }
    
    const { data: topicData, error: topicError } = await supabase
      .from('articles')
      .select('topic_id')
      .eq('article_id', article_id)
      .single()
    
    console.log('Topic data:', topicData?.topic_id);

    const topic_id = topicData?.topic_id;

    const { data: hellodata, error: helloerror } = await supabase
    .from('topics')
    .update({ isCompleted: true })
    .eq('topic_id', topic_id)
    .select();
    
    console.log('Hello data:', hellodata);


    if (hellodata && hellodata[0]) {
        toast.success(`You successfully learnt ${hellodata[0].topic_name} through this article!`);
    } else {
        toast.success(`You successfully completed the article : ${data[0].article_name}.`);
       }








    // console.log('Topic error:', topicError);

    console.log('Successfully updated article completion status:', data[0]);
    return { data: data[0], error: null };

    // Show success toast notification

  } catch (error) {
    console.error('Unexpected error while updating article:', error);
    return { data: null, error: 'Failed to update article completion status' };
  }
};